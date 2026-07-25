# Flutter
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

# Firebase
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }

# Play Core (required by Flutter deferred components)
-keep class com.google.android.play.core.** { *; }
-dontwarn com.google.android.play.core.**

# WebView
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep annotations
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
