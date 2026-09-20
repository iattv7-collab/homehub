package com.homehub.app

import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    private val appPackages = mapOf(
        "google" to "com.google.android.apps.chromecast.app",
        "nest" to "com.nest.android",
        "smartthings" to "com.samsung.android.oneconnect",
        "myq" to "com.chamberlain.android.liftmaster.myq",
        "philips" to "com.conex.philips",
    )

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.homeHubWebView)

        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()

        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.cacheMode = WebSettings.LOAD_DEFAULT
        webView.settings.loadsImagesAutomatically = true
        webView.settings.useWideViewPort = true
        webView.settings.loadWithOverviewMode = true
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = true

        val bridge = HomeHubAndroidBridge(this)
        webView.addJavascriptInterface(bridge, "HomeHubAndroid")

        webView.clearCache(true)
        webView.clearHistory()
        webView.loadUrl("https://homedex-hub.firebaseapp.com/?v=android-bridge-1")

        onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    if (webView.canGoBack()) {
                        webView.goBack()
                    } else {
                        isEnabled = false
                        onBackPressedDispatcher.onBackPressed()
                    }
                }
            },
        )
    }

    inner class HomeHubAndroidBridge(private val context: Context) {
        @Suppress("unused")
        @JavascriptInterface
        fun launchApp(appKey: String) {
            val packageName = appPackages[appKey] ?: return

            android.widget.Toast.makeText(
                context,
                "Launching: $packageName",
                android.widget.Toast.LENGTH_LONG
            ).show()

            val launchIntent = packageManager.getLaunchIntentForPackage(packageName)

            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(launchIntent)
                return
            }

            try {
                val storeIntent = Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("market://details?id=$packageName")
                )
                storeIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(storeIntent)
            } catch (_: ActivityNotFoundException) {
                val browserIntent = Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("https://play.google.com/store/apps/details?id=$packageName")
                )
                browserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(browserIntent)
            }
        }
    }
}