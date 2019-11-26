import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import BASE, { IMG_KEY } from '../lib/common';

export default class ReceiptScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      dataURI: [],
      uploadStatus: ''
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        const postUrl = resp.secure_url;
        return BASE('images').create(
          [
            {
              fields: {
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
      .then(() => {
        this.setState({
          uploadStatus: 'Upload Completed'
        });
      });
  };

  render() {
    const { hasCameraPermission } = this.state;
    // Before asking for permissions, renders blank screen
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
                    // TODO @JohnathanZhou use callback when referencing previous state
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}
                Flip{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.8,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              onPress={() => this.snap()}>
              <Text style={{ fontSize: 40, marginBottom: 10, color: 'white' }}>
                {' '}
                ⍜{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        {this.state.uploadStatus ? (
          <Text style={{ fontSize: 20, marginBottom: 15 }}>
            {this.state.uploadStatus}
          </Text>
        ) : (
          <Text />
        )}
      </View>
    );
  }
}
