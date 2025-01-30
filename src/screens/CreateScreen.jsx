import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateScreen = ({ data, setData }) => {
  const [itemName, setItemName] = useState('')
  const [stockAmt, setStockAmt] = useState('')
  const [unit, setUnit] = useState('')
  const [Mlimit, setMlimit] = useState('')


  const [buttonText, setButtonText] = useState('Add Item in the Stock')
  const handleEdit = (id, name, stock, unit, Mlimit) =>{
     setItemName(name)
     setStockAmt(stock)
     setUnit(unit)
     setMlimit(Mlimit)
     setButtonText('Update Stock')
  }

  const handleAddItem = () => {
  
    if(buttonText === 'Add Item in the Stock'){
    const newItem = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      Name: itemName,
      Stock: stockAmt,
      Unit: unit ? unit : 'units',
      Mlimit: Mlimit ? Mlimit : '50'
    }

    setData([...data, newItem]);
  }else{
    setData(data.map((item) => {
      if (item?.Name === itemName) {
        return { ...item, Stock: stockAmt, Unit: unit ? unit : 'units' };
      }
      return item;
    }))
  }
    setItemName('')
    setStockAmt('')
    setUnit('')
    setMlimit('')
  }


  const handleDelete = (id) =>{
            setData(data.filter((item) => item.ID !== id))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        placeholder='Enter an item name....'
        value={itemName}
        onChangeText={(item) => setItemName(item)}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"

        placeholder='Enter Stock Quantity....'
        value={stockAmt}
        onChangeText={(item) => setStockAmt(item)}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"

        placeholder='Enter Unit (optional)'
        value={unit}
        onChangeText={(item) => setUnit(item)}
      />
       <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        placeholder='Minimum Stock Limit (optional)'
        value={Mlimit}
        onChangeText={(item) => setMlimit(item)}
      />
      <Pressable style={styles.button} onPress={() => handleAddItem()}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>


      <View style={styles.headingContainer}>
        <Text style={styles.headingTextCreate}>All Items in the stock</Text>

      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <View>
            <View style={[styles.itemConatainer, { backgroundColor: item.Stock < item.Mlimit ? "#FFCCCC" : "#D7F6BFFF" }]}>
              <Text style={styles.itemText}>{item.Name}</Text>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text style={styles.headingText}>{item.Stock} {item.Unit && item.Unit}</Text>
                <Pressable onPress={() =>  handleEdit(item.ID, item.Name, item.Stock, item.Unit, item.Mlimit)}>
                <Text style={styles.headingText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() =>  handleDelete(item.ID)}>
                  <Text style={styles.headingText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{
          gap: 10
        }}
      />
    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 10
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D7F6BFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CABFEEFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7
  },

  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',

  },
  headingTextCreate: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5
  },
  headingText: {
    fontWeight: "500",
    fontSize: 14
  },
  itemConatainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7
  },
  itemText: {
    fontWeight: "400",
    fontSize: 14
  }
})