//
//  Generated file. Do not edit.
//

// clang-format off

#import "GeneratedPluginRegistrant.h"

#if __has_include(<shared_preferences/SharedPreferencesPlugin.h>)
#import <shared_preferences/SharedPreferencesPlugin.h>
#endif

#if __has_include(<url_launcher/UrlLauncherPlugin.h>)
#import <url_launcher/UrlLauncherPlugin.h>
#endif

@implementation GeneratedPluginRegistrant

+ (void)registerWithRegistry:(NSObject<FlutterPluginRegistry>*)registry {
  [FLTSharedPreferencesPlugin registerWithRegistrar:[registry registrarForPlugin:@"FLTSharedPreferencesPlugin"]];
  [FLTURLLauncherPlugin registerWithRegistrar:[registry registrarForPlugin:@"FLTURLLauncherPlugin"]];
}

@end
