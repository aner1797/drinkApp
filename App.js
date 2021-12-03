import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "\nVÄLKOMMEN TILL\n DRINK-APPEN!",
      instructions: "",
      image: "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/20d63k1504885263.jpg",
      ingredients: "",
      glass: "",
      visible: false
    };
    this.getDrink = this.getDrink.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);

  }

  getDrink(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php", {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const drink = responseJson.drinks[0];
      const name = drink.strDrink;
      const image = drink.strDrinkThumb;
      const instructions = "\n" + drink.strInstructions;
      //var ingredients = "Ingredienser:";
      var ingredients = "";
      for(var i = 1; i < 16; i++){
        if(drink["strIngredient"+i] != null && drink["strIngredient"+i].length > 0){
          ingredients += "\n" + drink["strIngredient"+i] + ": " + ((drink["strMeasure"+i] != null) ? drink["strMeasure"+i] : "Välj mängd");
        }
      }
      const glass = drink.strGlass + "\n";
      //ingredients += glass;

      this.setState({ image: image });
      this.setState({ name: name });
      this.setState({ instructions: instructions });
      this.setState({ ingredients: ingredients });
      this.setState({ glass: glass });
      //console.log(drink.idDrink);

    })
    .catch((error) => {
      console.log(error)
    });
  }

  toggleOverlay(){
    this.setState({visible: !this.state.visible})
  };


  render(){
    return (
      <View style={styles.base}>
            <TouchableOpacity style={styles.info} onPress={this.toggleOverlay}><Text style={{ fontSize: 30, color: "white" }}>i</Text></TouchableOpacity>
            
            {this.state.visible ? 
            <View style={styles.infoOverlay}>
              <Text style={{ fontSize: 17 }}>
                1 oz = 3 cl
                {"\n"}
                1 cup = 2,4 dl
              </Text>
            </View>
            :
            <View></View>
            }
            

          <Image
            style={styles.image}
            source={{ uri: this.state.image }}/>
            <View style={styles.scroll}>
                <ScrollView fadingEdgeLength={150}>
                  <Text style={styles.name}>{this.state.name}</Text>
                  {this.state.ingredients != "" ?
                  <View>
                    <Text style={styles.instructions}><Text style={{color:"#bfa949"}}>INSTRUKTIONER</Text>{this.state.instructions}</Text>
                    <Text style={styles.instructions}>
                      <Text style={{color:"#bfa949"}}>INGREDIENSER</Text>
                      {this.state.ingredients}
                      <Text style={{color:"#bfa949"}}>{"\n\n"}Serveras i:{"\n"}</Text>
                      {this.state.glass}
                    </Text>
                  </View>
                  :
                  null
                  }
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.getDrink}><Text style={{ fontSize: 35, color: "white" }}>NY DRINK</Text></TouchableOpacity>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#4d524e"
  },
  button: {
    flex: 1,
    backgroundColor: "#bfa949",
    padding: 10,
    width: "60%",
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: "center",
    marginBottom: "7%",
    borderRadius: 50
  },
  info: {
    position: "absolute",
    zIndex: 1,
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#bfa949',
    borderRadius:50,
    margin: 10,
    borderColor: "#e0bf34",
    borderWidth: 5
  },
  infoOverlay: {
    position: "absolute",
    zIndex: 1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: "center",
    marginTop: "20%",
    width: "30%",
    backgroundColor:'#969e98',
    borderColor: "#4d524e",
    borderWidth: 2
  },
  scroll: {
    flex: 7,
  },
  name: {
    flex:1,
    fontSize: 30,
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: "center",
    color: "#bfa949",
    fontWeight: 'bold',

  },
  instructions: {
    flex: 7,
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  image: {
    flex: 7,
    resizeMode: "stretch" //contain, cover
    //width: "80%",
  },
});
