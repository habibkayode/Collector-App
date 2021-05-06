import { AppRegistry } from "react-native";
import App from "./App2";
import Wrapper from "./Wrapper";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => Wrapper);
