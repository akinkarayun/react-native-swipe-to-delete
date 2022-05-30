import React, { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Notifications } from '../data/Notification';

interface NotificationScreenProps { }

export const NotificationScreen: React.FC<NotificationScreenProps> = ({ }) => {
  const [rightValue, setRightValue] = useState({ rightValue: 0, key: '' });
  const [leftActionActivated, setLeftActionActivated] = useState(false);
  const [listData, setListData] = useState(
    Notifications.map((NotificationItem, index) => ({
      key: `${index}`,
      title: NotificationItem.title,
      message: NotificationItem.message,
    })),
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('this row open', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('this row status left changes', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    setRightValue({ rightValue: rowKey.value, key: rowKey.key });
    setLeftActionActivated(rowKey.isActivated);
    console.log('this row status right changes', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('right action', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('left action', rowKey);
  };
  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={(data, rowMap) => {
          const rowHeightAnimatedValue = new Animated.Value(60);
          let rightActionActivated = -200;

          if (rightActionActivated > rightValue.rightValue) {
            Animated.spring(rowHeightAnimatedValue, {
              toValue: 0,
              useNativeDriver: false,
            }).start(() => {
              deleteRow(rowMap, rightValue.key);
            });
            setRightValue({ rightValue: 0, key: '' });
            setTimeout(() => {
              setLeftActionActivated(false);
            }, 5000);
          }
          return (
            <TouchableHighlight style={styles.rowFront}>
              <View style={styles.rowFrontVisible}>
                <Text style={styles.title} numberOfLines={1}>
                  {data.item.title}
                </Text>
                <Text style={styles.details} numberOfLines={1}>
                  {data.item.message}
                </Text>
              </View>
            </TouchableHighlight>
          );
        }}
        renderHiddenItem={(data, rowMap) => {
          const rowActionAnimatedValue = new Animated.Value(75);
          let rightActionActivated = -200;

          if (rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
              toValue: 0,
              useNativeDriver: false,
            }).start();
          }

          return (
            <Animated.View style={[styles.rowBack, { height: 60 }]}>
              {leftActionActivated === false ? (
                <>
                  <TouchableOpacity
                    onPress={() => closeRow(rowMap, data.item.key)}
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                    <MaterialCommunityIcons
                      style={styles.trash}
                      name="close-circle-outline"
                      size={25}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <Animated.View
                    style={[
                      styles.backRightBtn,
                      styles.backRightBtnRight,
                      { flex: 1, width: rowActionAnimatedValue },
                    ]}>
                    <TouchableOpacity
                      onPress={() => deleteRow(rowMap, data.item.key)}
                      style={[styles.backRightBtn, styles.backRightBtnRight]}>
                      <Animated.View style={[styles.trash]}>
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={25}
                          color="#fff"
                        />
                      </Animated.View>
                    </TouchableOpacity>
                  </Animated.View>
                </>
              ) : (
                <Animated.View
                  style={[
                    styles.backRightBtn,
                    styles.backRightBtnRight,
                    { width: 400 },
                  ]}>
                  <Animated.View style={[styles.trash]}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={25}
                      color="#fff"
                    />
                  </Animated.View>
                </Animated.View>
              )}
            </Animated.View>
          );
        }}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onRightAction={onRightAction}
        onLeftAction={onLeftAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },

  rowFrontVisible: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },

  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  details: {
    fontSize: 10,
    color: '#999',
  },
});
