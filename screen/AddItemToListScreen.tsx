import React, { useCallback } from 'react'
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FadeIn } from 'react-native-reanimated';

interface AddItemToListScreenProps { }

interface IProps {
  id: number;
}



const LIST_ITEM_COLOR = '#00ff00';
const items: IProps[] = new Array(10).fill(0).map((_, i) => ({ id: i }));

export const AddItemToListScreen: React.FC<AddItemToListScreenProps> = ({ }) => {

  const [items, setItems] = React.useState<IProps[]>([]);


  const onAddItem = React.useCallback(() => {
    setItems((currentItem) => {
      const nextItem = (currentItem[currentItem.length - 1]?.id ?? 0) + 1;
      return [...currentItem, { id: nextItem }];
    });

  }, []);

  const onDelete = React.useCallback((itemId: number) => {
    setItems((currentItem) => {
      return currentItem.filter((item) => item.id !== itemId);
    });

  }, []);



  return (
    <View style={style.container}>
      <Pressable onPress={onAddItem} style={style.floatingButton}>
        <Text style={{ color: 'white', fontSize: 40 }}>+</Text>
      </Pressable>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 20 }}>
        {items.map(item => {
          return (
            <Animated.View onTouchEnd={() => onDelete(item.id)} key={item.id} style={style.listItem} />
          )
        })}
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    backgroundColor: LIST_ITEM_COLOR,
    height: 100,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    zIndex: 0,


  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 40,
    zIndex: 10,
    position: 'absolute',
    flex: 1

  }
})