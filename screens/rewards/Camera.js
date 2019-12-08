import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import BASE, { IMG_KEY } from '../../lib/common';

export default class ReceiptScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      dataURI: [],
      uploadStatus: '',
      customerId: '',
      transactionId: ''
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const userId = this.props.navigation.getParam('customerId', 'defaultValue');
    const transactionId = this.props.navigation.getParam(
      'transactionId',
      'defaultValue'
    );
    this.setState({
      hasCameraPermission: status === 'granted',
      customerId: userId,
      transactionId
    });
  }

  // Runs the expo-camera takePictureAsync function to generate the image binary to upload.
  // Also pauses the preview so that the user can see what they are uploading
  // @TODO: Johnathan add functionality for user to confirm the image upload.
  snap = async () => {
    if (this.camera) {
      this.camera.takePictureAsync({ base64: true, quality: 0 }).then(photo => {
        this.camera.pausePreview();
        const base64 = `data:image/jpeg;base64,${photo.base64}`;
        this.setState({
          uploadStatus: 'Uploading...'
        });
        this._uploadImage(base64);
      });
    }
  };

  // Uploads the base64 binary image to cloudinary and then uses that generated URL
  // to create an Airtable record with the image.
  // TODO: @Johnathan, move the airtable portion to the other file
  _uploadImage = async imageBinary => {
    const apiUrl = 'https://api.cloudinary.com/v1_1/dxecwnkxx/image/upload';
    const data = {
      file: imageBinary,
      upload_preset: IMG_KEY
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => {
        return data.json();
      })
      .catch(err => {
        console.error(err);
      })
      .then(data => {
        const postUrl = data.secure_url;
        const currentDate = new Date();
        return BASE('Receipts').create(
          [
            {
              fields: {
                Transaction: [this.state.transactionId],
                Time: currentDate.toISOString(),
                Customer: [this.state.customerId],
                Attachments: [
                  {
                    url: postUrl
                  }
                ]
              }
            }
          ],
          { typecast: true }
        );
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        this.setState({
          uploadStatus: 'Upload Completed'
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  _returnHome = async () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
          base64>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}
                Flip{' '}
              </Text>
              {/* TODO: @Johnathan, make this button pretty and improve the UX of uploading the picture */}
              {this.state.uploadStatus === 'Upload Completed' ? (
                <Button
                  style={{ fontSize: 20 }}
                  title="Finish"
                  onPress={this._returnHome}
                />
              ) : (
                <Text />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.8,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              onPress={() => this.snap()}>
              <Text style={{ fontSize: 40, color: 'white' }}> ⍜ </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        {this.state.uploadStatus ? (
          <Text style={{ fontSize: 20 }}>{this.state.uploadStatus}</Text>
        ) : (
          <Text />
        )}
      </View>
    );
  }
}
