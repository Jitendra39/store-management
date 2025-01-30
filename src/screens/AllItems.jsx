import { FlatList, StyleSheet, Text, View } from 'react-native'
 
const AllItems = ({data}) => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Items</Text>
        <Text style={styles.headingText}>Quantity</Text>
      </View>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.ID}
        renderItem={({item}) => (
          <View style={[styles.itemConatainer, {backgroundColor: item?.Stock < item.Mlimit ? "#FFCCCC" : "#D7F6BFFF"}]}>
            <Text style={styles.itemText}>{item?.Name}</Text>
            <Text style={styles.headingText}>{item?.Stock} {item?.Unit && item.Unit}</Text>
          </View>
        )}
        contentContainerStyle={{
          gap: 10
        }}
      />
    </View>
  )
}

export default AllItems

const styles = StyleSheet.create({
  headingContainer:{
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  headingText:{
   fontWeight: "500",
   fontSize: 14
  },
  itemConatainer:{
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7
  },
  itemText:{
    fontWeight: "400",
   fontSize: 14
  }
})