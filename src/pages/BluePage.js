import React from 'react'
import { ImageBackground, StyleSheet, View, Text, Platform} from 'react-native'
import { BleManager } from "react-native-ble-plx"

export default class BluePage extends React.Component {

    constructor() {
        super()
        this.manager = new BleManager()
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.manager.onStateChange((state) => {
                if (state === 'PoweredOn') this.scanAndConnect()
            })
        }
        else {
            this.scanAndConnect()
        }
    }

    scanAndConnect() {
        const BLE_DEVICE_NAME = "BW_FYE7"

        this.manager.startDeviceScan(null, null, (error, device) => {
            console.log("Scanning...")
            if (device != null) console.log(device.name)

            if (error) {
                 console.log(error)
                 return
            }

            if ( (device != null) && (device.name == BLE_DEVICE_NAME)) {
                console.log("Connecting to device")
                this.manager.stopDeviceScan()
                device.connect()
                    .then((device) => {
                        console.log("Discovering services and characteristics")
                        return device.discoverAllServicesAndCharacteristics()
                    })
                    .then((device) => {
                        console.log("Setting notifications")
                    })
                    .then(() => {
                        console.log("Listening...")
                    }, (error) => {
                        console.log(error.message)
                    })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../img/background.png')}
                    style={styles.bgImage}
                    resizeMode="cover">
                    <View style={[styles.section, styles.sectionLarge]}>
                        <Text>BluePage</Text>
                    </View>


                </ImageBackground>

            </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10
    },
    bgImage: {
        flex: 1,
        marginHorizontal: -20
    },
    textPoint: {
        color: 'white',
        fontSize: 80,
    },
    section: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionLage: {
        flex: 4,
        justifyContent: 'space-around',
    },
})
