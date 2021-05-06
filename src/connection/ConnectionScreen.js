import React from "react";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import {
  Container,
  Text,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Subtitle,
  Right,
} from "native-base";
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Buffer } from "buffer";

/**
 * Manages a selected device connection.  The selected Device should
 * be provided as {@code props.device}, the device will be connected
 * to and processed as such.
 *
 * @author kendavidson
 */
export default class ConnectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
      data: [],
      polling: true,
      connection: false,
      connectionOptions: {
        CONNECTOR_TYPE: "rfcomm",
        DELIMITER: "\r",
        READ_SIZE: 1024,
        DEVICE_CHARSET: "utf-8",
      },
    };
  }
  /**
   * Removes the current subscriptions and disconnects the specified
   * device.  It could be possible to maintain the connection across
   * the application, but for now the connection is within the context
   * of this screen.
   */
  async componentWillUnmount() {
    if (this.state.connection) {
      try {
        await this.props.device.disconnect();
      } catch (error) {
        // Unable to disconnect from device
      }
    }

    this.uninitializeRead();
  }

  tt = new BluetoothDevice({});
  /**
   * Attempts to connect to the provided device.  Once a connection is
   * made the screen will either start listening or polling for
   * data based on the configuration.
   */

  componentDidMount() {
    this.mm = new BluetoothDevice({
      address: this.props.device.address,
      extra: this.props.device.extra,
      id: this.props.device.id,
      name: this.props.device.name,
    });
    console.log(this.mm, "kkk");
    setTimeout(() => this.connect(), 0);
  }

  async connect() {
    try {
      let connection = await this.props.device.isConnected();
      if (!connection) {
        this.addData({
          data: `Attempting connection to ${this.props.device.address}`,
          timestamp: new Date(),
          type: "error",
        });

        console.log(this.state.connectionOptions);
        connection = await this.props.device.connect(
          this.state.connectionOptions
        );

        this.addData({
          data: "Connection successful",
          timestamp: new Date(),
          type: "info",
        });
      } else {
        console.log(this.mm.address, "addre");
        this.addData({
          data: `Connected to ${this.props.device.address}`,
          timestamp: new Date(),
          type: "error",
        });
      }

      this.setState({ connection });
      this.initializeRead();
    } catch (error) {
      this.addData({
        data: `Connection failed: ${error.message}`,
        timestamp: new Date(),
        type: "error",
      });
    }
  }

  async disconnect(disconnected) {
    try {
      if (!disconnected) {
        disconnected = await this.props.device.disconnect();
      }

      this.addData({
        data: "Disconnected",
        timestamp: new Date(),
        type: "info",
      });

      this.setState({ connection: !disconnected });
    } catch (error) {
      this.addData({
        data: `Disconnect failed: ${error.message}`,
        timestamp: new Date(),
        type: "error",
      });
    }

    // Clear the reads, so that they don't get duplicated
    this.uninitializeRead();
  }

  initializeRead() {
    console.log("oooooo");
    this.disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() =>
      this.disconnect(true)
    );

    if (this.state.polling) {
      console.log("oooooo1111");
      this.readInterval = setInterval(() => this.performRead(), 5000);
    } else {
      RNBluetoothClassic.onDeviceRead(this.props.device.address, (data) =>
        console.log(data, "opp")
      );
      this.readSubscription = this.props.device.onDataReceived((data) =>
        this.onReceivedData(data)
      );
    }
  }

  /**
   * Clear the reading functionality.
   */
  uninitializeRead() {
    if (this.readInterval) {
      clearInterval(this.readInterval);
    }
    if (this.readSubscription) {
      this.readSubscription.remove();
    }
  }

  async performRead() {
    try {
      console.log("Polling for available messages");
      let available = await this.props.device.available();
      console.log(`There is data available [${available}], attempting read`);

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          console.log(`reading ${i}th time`);
          let data = await this.props.device.read();

          console.log(`Read data ${data}`);
          console.log(data);
          this.onReceivedData({ data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  toHex(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }

  hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

  bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(parseInt(array[i], 2));
    }
    return result;
  }

  /**
   * Handles the ReadEvent by adding a timestamp and applying it to
   * list of received data.
   *
   * @param {ReadEvent} event
   */
  async onReceivedData(event) {
    console.log("123");
    console.log("Data received");
    console.log(event.data, "hex", this.toHex(event.data));
    //  console.log("ASCII", this.convertToASCII(event.data));
    //console.log(Buffer.from(event.data).toString("utf8"));
    console.log("ppp");
    // console.log(
    //   String(event.data)
    //     .trim()
    //        ["4.2", "4.2", ".2", undefined]
    //     .match(/(\d+(\.\d+)?)|(\.\d+)/),
    //   "length"
    // );
    event.timestamp = new Date();
    this.addData({
      ...event,
      timestamp: new Date(),
      type: "receive",
    });
  }
  bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(parseInt(array[i], 2));
    }
    return result;
  }
  async addData(message) {
    this.setState({ data: [message, ...this.state.data] });
  }

  string2Bin(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
      result.push(str.charCodeAt(i));
    }
    return result;
  }

  convertToASCII = (str1) => {
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    console.log(str, "str");
    return str;
  };

  /**
   * Attempts to send data to the connected Device.  The input text is
   * padded with a NEWLINE (which is required for most commands)
   */
  async sendData() {
    try {
      console.log(`Attempting to send data ${this.state.text}`);
      let message = this.state.text + "\r";
      await RNBluetoothClassic.writeToDevice(
        this.props.device.address,
        message
      );

      this.addData({
        timestamp: new Date(),
        data: this.state.text,
        type: "sent",
      });

      let data = Buffer.alloc(10, 0xef);
      await this.props.device.write(data);

      this.addData({
        timestamp: new Date(),
        data: `Byte array: ${data.toString()}`,
        type: "sent",
      });

      this.setState({ text: undefined });
    } catch (error) {
      console.log(error);
    }
  }

  async toggleConnection() {
    if (this.state.connection) {
      this.disconnect();
    } else {
      this.connect();
    }
  }

  render() {
    let toggleIcon = this.state.connection
      ? "radio-button-on"
      : "radio-button-off";

    return (
      <Container>
        <Header iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={this.props.onBack}>
              <Icon type="Ionicons" name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.device.name}</Title>
            <Subtitle>{this.props.device.address}</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => this.toggleConnection()}>
              <Icon type="Ionicons" name={toggleIcon} />
            </Button>
          </Right>
        </Header>
        <View style={styles.connectionScreenWrapper}>
          <FlatList
            style={styles.connectionScreenOutput}
            contentContainerStyle={{ justifyContent: "flex-end" }}
            inverted
            ref="scannedDataList"
            data={this.state.data}
            keyExtractor={(item) => item.timestamp.toISOString()}
            renderItem={({ item }) => (
              <View
                id={item.timestamp.toISOString()}
                flexDirection={"row"}
                justifyContent={"flex-start"}
              >
                <Text>{item.timestamp.toLocaleDateString()}</Text>
                <Text>{item.type === "sent" ? " < " : " > "}</Text>
                <Text flexShrink={1}>{item.data.trim()}</Text>
              </View>
            )}
          />
          <InputArea
            text={this.state.text}
            onChangeText={(text) => this.setState({ text })}
            onSend={() => this.sendData()}
            disabled={!this.state.connection}
          />
        </View>
      </Container>
    );
  }
}

const InputArea = ({ text, onChangeText, onSend, disabled }) => {
  let style = disabled ? styles.inputArea : styles.inputAreaConnected;
  return (
    <View style={style}>
      <TextInput
        style={styles.inputAreaTextInput}
        placeholder={"Command/Text"}
        value={text}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={onSend}
        returnKeyType="send"
        disabled={disabled}
      />
      <TouchableOpacity
        style={styles.inputAreaSendButton}
        onPress={onSend}
        disabled={disabled}
      >
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * TextInput and Button for sending
 */
const styles = StyleSheet.create({
  connectionScreenWrapper: {
    flex: 1,
  },
  connectionScreenOutput: {
    flex: 1,
    paddingHorizontal: 8,
  },
  inputArea: {
    flexDirection: "row",
    alignContent: "stretch",
    backgroundColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  inputAreaConnected: {
    flexDirection: "row",
    alignContent: "stretch",
    backgroundColor: "#90EE90",
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  inputAreaTextInput: {
    flex: 1,
    height: 40,
  },
  inputAreaSendButton: {
    justifyContent: "center",
    flexShrink: 1,
  },
});
