import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import AllItems from './AllItems'
import CreateScreen from './CreateScreen'
import { loadData, requestStoragePermission, saveData } from '../utils/localStorage'

 

const HomeScreen = () => {
    const [view, setView] = useState(0);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = () => {
      setRefreshing(true);
      // Add your refresh logic here
      setRefreshing(false);
    };


useEffect(() =>{
  requestStoragePermission();
    const fetchData = async () => {
        const data = await loadData();
        if(data){
            setData(data);
        }
      console.log(data);
    }
    fetchData();
},[])


useEffect(() =>{
  console.log(data);
  saveData(data);
},[data])

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, view === 0 ? { backgroundColor: '#72C37AFF' } : null]}
          onPress={() => setView(0)}
        >
          <Text style={[styles.btnText, view === 0 ? { color: 'white' } : null]}>All Items</Text>
        </Pressable>
        <Pressable
          style={[styles.button, view === 1 ? { backgroundColor: '#de5d35' } : null]}
          onPress={() => setView(1)}
        >
          <Text style={[styles.btnText, view === 1 ? { color: 'white' } : null]}>Low Stock</Text>
        </Pressable>
        <Pressable
          style={[styles.button, view === 2 ? { backgroundColor: '#72C37AFF' } : null]}
          onPress={() => setView(2)}
        >
          <Text style={[styles.btnText, view === 2 ? { color: 'white' } : null]}>Create</Text>
        </Pressable>
      </View>
      {view === 0 && <AllItems data={data}/>}
      {view === 1 && <AllItems data={data?.filter((item) => item.Stock < item.Mlimit)}/>}
      {view === 2 && <CreateScreen data={data} setData={setData}/>}
    </ScrollView>
  )
}

export default HomeScreen   

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding:'4%',
        backgroundColor: "#ffffff"
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer:{
        flexDirection: "row",
        gap:10,
        marginVertical: 10
    },
    button:{
       paddingVertical: 3.5,
       paddingHorizontal: 10,
        borderRadius: 50,
        borderColor: "#72C37AFF",
        borderWidth: 0.8
    },
    btnText: {
        color: 'green',
        // fontWeight: 'bold',
        fontSize: 14
    }
})