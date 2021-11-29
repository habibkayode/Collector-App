
package com.scrapays.collector;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle; // here

import androidx.core.app.NotificationCompat;

import org.devio.rn.splashscreen.SplashScreen; // here

import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {


    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_ALARM)
                    .build();
            Uri bellUri = Uri.parse(
                    "android.resource://" +
                            getApplicationContext().getPackageName() +
                            "/" +
                            R.raw.bell);
            CharSequence name = getString(R.string.channel_name);
            String description = getString(R.string.channel_description);
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel("alert", name, importance);
            channel.enableLights(true);
            channel.enableVibration(true);
          //  channel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200,});
              channel.setVibrationPattern(new long[]{1000, 2000, 3000, 4000,5000,6000 });
         
            channel.setSound(bellUri,audioAttributes);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);

        }
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SoLoader.init(this, false);
        SplashScreen.show(this, R.style.SplashTheme);  // here
        createNotificationChannel();
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CollectorApp";
    }
}
