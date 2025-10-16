# Bluetooth Connectivity Troubleshooting

## Starlight Projector 3000 - Common Bluetooth Issues

### Issue: Won't Pair with Phone/Tablet

This is the #1 support request we receive. The good news: 80% of pairing issues can be resolved with a simple reset.

#### Solution 1 - Reset Bluetooth Module (FIXES 80% OF CASES)

**Step-by-step reset procedure:**
1. Ensure the projector is powered on
2. Hold down **POWER** and **VOLUME DOWN** buttons **simultaneously**
3. Keep holding for **5 full seconds**
4. Watch for the blue LED indicator - it will flash **3 times rapidly**
5. Release both buttons
6. The Bluetooth module is now reset to factory settings

**After reset:**
- Wait 10 seconds for the module to initialize
- Put your phone/tablet into Bluetooth pairing mode
- Look for "SP3000-XXXX" in your device's Bluetooth list (XXXX = last 4 digits of serial number)
- Select it and pair

**Success rate:** This resolves connectivity issues in 80% of cases reported to support.

#### Solution 2 - Firmware Update

If the reset doesn't work, your firmware may be outdated. Bluetooth stability was significantly improved in version 2.3.1.

**Check your firmware version:**
1. Navigate to **Settings** > **About** > **Firmware Version**
2. Current version should be displayed (e.g., "v2.3.1" or higher)

**If you're on version 2.3.0 or lower:**
1. Connect projector to WiFi (Settings > Network > WiFi Setup)
2. Go to Settings > About > Firmware
3. Tap **"Check for Updates"**
4. If update available, tap **"Update Now"**
5. Update takes 3-5 minutes - **DO NOT POWER OFF** during update
6. Projector will restart automatically when complete

**Improvements in v2.3.1:**
- 40% faster Bluetooth pairing
- Improved connection stability with Android 13+ devices
- Reduced audio latency by 50ms
- Fixed connection drops with iPhone 14 and newer

#### Solution 3 - Clear Paired Devices List

The SP3000 can remember up to 8 paired devices. If the memory is full, new devices can't pair.

**To clear old devices:**
1. Go to **Settings** > **Bluetooth** > **Paired Devices**
2. You'll see a list of previously connected devices
3. Select devices you no longer use
4. Tap **"Forget Device"** or **"Remove"**
5. Recommended: Keep only 3-4 frequently used devices

**After clearing:**
- Try pairing your device again
- It should now appear in the available slots

### Issue: Audio Cutting Out or Stuttering

This is usually a range or interference issue, not a hardware problem.

#### Bluetooth Range Specifications
- **Optimal range:** 0-20 feet (0-6 meters)
- **Maximum range:** 30 feet (10 meters) in open space
- **Through walls:** 15 feet (5 meters) maximum

#### Common causes of audio dropout:

**1. Distance/Obstacles**
- **Solution:** Move phone/tablet closer to projector
- **Solution:** Remove obstacles between device and projector (metal objects, walls, large furniture)
- **Tip:** Line-of-sight connection is always best

**2. Low Battery (on either device)**
- **Solution:** Ensure projector battery is above 20%
- **Solution:** Ensure phone/tablet battery is above 20%
- **Fact:** Low battery mode reduces Bluetooth transmission power by up to 50%

**3. Interference from other wireless devices**
- **Common culprits:** WiFi routers, microwave ovens, baby monitors, other Bluetooth devices
- **Solution:** Move projector away from WiFi router (at least 6 feet)
- **Solution:** Turn off other nearby Bluetooth devices temporarily
- **Tip:** 2.4GHz WiFi and Bluetooth share the same frequency band

**4. Too many connected Bluetooth devices**
- **Solution:** Disconnect unused Bluetooth devices from your phone
- **Fact:** Most phones struggle with 3+ active Bluetooth connections

#### Advanced troubleshooting:

**Change Bluetooth codec (Android only):**
1. Enable Developer Options on your Android device
2. Go to Settings > Developer Options > Bluetooth Audio Codec
3. Try switching between SBC, AAC, and aptX
4. SBC is most compatible; AAC often provides best quality

**Network Settings > Reset (iOS only):**
1. Settings > General > Transfer or Reset iPhone > Reset
2. Choose "Reset Network Settings"
3. This clears all WiFi and Bluetooth settings
4. Re-pair with SP3000

### Issue: Audio Delay / Lip Sync Problems

This is common with certain Android devices and is usually correctable.

#### Adjust Bluetooth audio delay:

**On the SP3000:**
1. Go to **Settings** > **Audio** > **Bluetooth Delay**
2. Default is 0ms (no adjustment)
3. Adjust slider from 0ms to +200ms
4. Play a video and adjust until lips sync with audio
5. Most users find **100-150ms** works best

**Why this happens:**
- Bluetooth audio has inherent latency (30-200ms depending on codec)
- Video processing adds additional delay
- Different devices have different processing speeds

**Device-specific recommendations:**
- **iPhone/iPad:** Usually works well at 50-75ms
- **Samsung Galaxy:** Try 100-125ms
- **Google Pixel:** Try 75-100ms
- **Older Android (pre-2020):** May need 150-200ms

### Issue: Bluetooth Won't Turn On

Rare issue but can happen after firmware updates or extended storage.

#### Hard reset procedure:

**Full factory reset (last resort):**
1. Power off the projector completely
2. Unplug power cable and wait 60 seconds
3. Hold **MENU** + **POWER** buttons together
4. While holding, plug in power cable
5. Keep holding for 10 seconds until you see "Factory Reset" on screen
6. Release buttons and follow on-screen prompts

**Warning:** This erases all settings, saved WiFi networks, and paired devices. Only use if other solutions fail.

### Issue: Can Connect But No Sound

#### Checklist:
1. ✅ Volume is turned up on both projector and phone/tablet
2. ✅ Projector is set to "Bluetooth" input (not HDMI or USB)
3. ✅ Phone/tablet is not in silent mode
4. ✅ Music/video is actually playing on the source device
5. ✅ No headphones connected to source device

#### Additional checks:
- Go to Settings > Audio > Output Device
- Ensure "Bluetooth Speaker" is selected (not "Internal Speaker" or "HDMI")
- Try playing audio from a different app
- Restart both devices and re-pair

### Prevention Tips

**To avoid Bluetooth issues:**
1. Keep firmware updated (check monthly)
2. Don't let paired device list fill up (max 4-5 devices recommended)
3. Keep projector and source device within 15 feet
4. Charge both devices before outdoor movie sessions
5. Avoid placing projector near WiFi routers or microwaves

### When to Contact Support

Contact our support team if:
- Issue persists after trying all solutions above
- Blue LED doesn't flash during reset
- Firmware update fails or gets stuck
- Bluetooth option is completely missing from settings
- Hardware damage is suspected

**Support hours:** Mon-Fri 9 AM - 6 PM EST
**Email:** support@starlightproducts.com
**Phone:** 1-800-STAR-PROJ (1-800-782-7776)
**Average response time:** 4 hours for email, immediate for phone

## Aurora Beam 5000 - Bluetooth Troubleshooting

The AB5000 doesn't have a built-in Bluetooth speaker, so Bluetooth issues are less common. However, it does support Bluetooth remote control.

### Issue: Bluetooth Remote Won't Pair

**Quick fix:**
1. Hold **SELECT** button on remote for 5 seconds
2. Remote will flash blue
3. Go to projector: Settings > Remotes > Add New
4. Remote should appear and pair automatically

### Issue: Voice Control via Bluetooth Not Working

The AB5000 supports voice commands through Google Assistant or Alexa via smartphone.

**Setup:**
1. Ensure AB5000 is connected to WiFi
2. Open Google Home or Alexa app
3. Add new device > Projector > Aurora Beam 5000
4. Follow pairing instructions in app
5. Say "Hey Google, turn on projector" or "Alexa, play Netflix on projector"

**Note:** Voice control requires WiFi connection, not just Bluetooth.

## General Bluetooth Best Practices

### Optimal setup for best performance:
- Keep devices within 15 feet of each other
- Maintain line-of-sight when possible
- Update firmware on both projector and source device
- Use quality audio sources (Spotify/Apple Music vs compressed MP3s)
- Avoid peak WiFi usage times in crowded areas

### Battery conservation:
- Bluetooth uses about 10% of battery per hour
- For extended outdoor sessions (3+ hours), use wired HDMI connection to save phone battery
- Portable battery packs work great for both phone and projector

### Sound quality tips:
- For best audio, use SBC or AAC codec
- aptX provides lower latency but less compatible
- For critical listening, consider using external speakers via aux cable
- Built-in speaker is great for casual viewing but audiophiles prefer external audio

