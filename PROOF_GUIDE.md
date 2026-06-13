
## Recording video with maestro

1. Run emulator headless
2. Build the app
3. Install the app into the emulator
4. Run maestro record. Use `--local` argument 

Example for android (`emulator -list-avds` returned `defaultEmulator` as one)

```bash
cd mobile
emulator -avd defaultEmulator -no-window -no-audio -no-boot-anim
flutter build apk --debug
adb install build/app/outputs/flutter-apk/app-debug.apk
maestro record --local .maestro/auth.yaml output.mp4
```



### iOS

`xcrun simctl list devices` listed "iPhone 17" as one of the devices.

```bash
xcrun simctl boot "iPhone 17"

# Wait until the device status is 'Booted'
xcrun simctl bootstatus "iPhone 17"

flutter run -d "iPhone 17" --debug

maestro record --local .maestro/auth.yaml output.mp4


xcrun simctl shutdown "iPhone 17"

```




To see the simulator window, you do not use xcrun. Instead, you use the standard macOS open command to launch Apple's built-in Simulator application:
```bash
open -a Simulator
```



xcrun simctl io "iPhone 15" screenshot MyScreenshot.png

xcrun simctl io "iPhone 15" recordVideo MyVideo.mp4

### Flutter integration tests


flutter test integration_test/app_test.dart -d "iPhone 15"
integrations test allow to capture screenshots directly from your Dart code using the integration_test package:

```dart
final IntegrationTestWidgetsFlutterBinding binding =
    IntegrationTestWidgetsFlutterBinding.ensureInitialized();

// Inside your test:
await tester.pumpAndSettle();
await binding.takeScreenshot('headless_home_page');
```