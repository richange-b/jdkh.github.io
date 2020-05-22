import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {singerList: []};
  }

  renderSon = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          height: 120,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginRight: 5,
            }}>
            {index + 1}
          </Text>
          <Image
            source={{uri: item.img}}
            style={{height: 90, width: 120, resizeMode: 'stretch'}}
          />
        </View>
        <Text style={{fontSize: 16, flex: 1}}>{item.name}</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#fff',
              justifyContent: 'center',
            }}>
            <Button
              title="删除"
              onPress={() => {
                var res = JSON.parse(JSON.stringify(this.state.singerList));
                for (let i = 0; i < this.state.singerList.length; i++) {
                  if (item.id === this.state.singerList[i].id) {
                    res.splice(i, 1);
                  }
                }
                this.setState({
                  singerList: res,
                });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  componentDidMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          singerList: res,
        });
      });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.singerList}
          renderItem={this.renderSon}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={<Text>歌曲为空</Text>}
          refreshing={false}
          onEndReachedThreshold={3}
        />
      </View>
    );
  }
}
module.exports = App;
