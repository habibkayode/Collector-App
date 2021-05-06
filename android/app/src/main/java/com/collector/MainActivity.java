
package com.collector;
import android.os.Bundle; // here 
import org.devio.rn.splashscreen.SplashScreen; // here 
import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {


 @Override
    protected void onCreate(Bundle savedInstanceState) {
       SoLoader.init(this, false);
        SplashScreen.show(this,R.style.SplashTheme);  // here 
        super.onCreate(savedInstanceState); 
    }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "collector";
  }
}