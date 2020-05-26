/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput ,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* const App: () => React$Node = () => {

  const _changeHandler = e => {

    let value = e.target.value ;
    console.log( 'target : ', e.target ) ;
    console.log( value ) ; 
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>현재 보유</Text>
              <TextInput 
                placeholder="매수 가격"          
                name="crntPrice"
                onChange={ _changeHandler }
                style={ styles.inputStyles }
              />
              <TextInput 
                placeholder="매수 수량"
                name="crntNum"
                style={ styles.inputStyles }
              />      
              <TextInput 
                style={ styles.inputStyles }
                placeholder="합계"
                editable = {false}
              />
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
 */

class App extends Component {

  defaultState = {
    crntPrice : '' ,
    crntNum : '' ,
    crntTotal : '' ,
    addPrice : '' , 
    addNum : '' , 
    addTotal : '' ,
    totalNum : '' ,
    totalPrice : '' ,
    finalPrice : '' ,
    goalNextPrice : '' ,
    goalPrevPrice : '' ,
    goalBuyNum : '' ,
    goalBuyPrice : '' ,
  }

  constructor( props ) {
    super( props ) ;
    this.state = this.defaultState ; 
  }

  _changeHandler = ( value, name ) => {

    let last = value.split('').pop() 
    ,   regexp = /^[0-9]+$/
    ;

    if( value == '' || regexp.test( last ) ){
      this.setState({ [name] : value }, () => {
        this._setValue() ;
      }) ;
    } 

  }

  _setValue = _ => {
    let { crntNum, crntPrice, addNum, addPrice } = this.state ;
    let crntTotal = Number( crntNum ) * Number( crntPrice )  ;
    let addTotal = Number( addNum ) * Number( addPrice )  ;
    let totalNum = Number( crntNum ) + Number( addNum )  ;
    let totalPrice = crntTotal + addTotal ;
    let finalPrice = totalPrice / totalNum ;

    this.setState({ crntTotal, addTotal, totalNum, addTotal, totalPrice, finalPrice }) ;
  }

  _resetHandler = _ => {
    console.log( 'click in' ) ;
    let state = this.state 
    ,   defaultState = this.defaultState 
    ;
    this.setState({ ...defaultState }) ;
    this._buyPrice.focus() ;
  }

  render (){
 
    let { 
      crntTotal , 
      crntPrice , 
      crntNum , 
      addPrice , 
      addNum , 
      addTotal , 
      finalPrice , 
      totalPrice , 
      totalNum ,
      goalNextPrice ,
      goalPrevPrice ,
      goalBuyNum ,
      goalBuyPrice
    } = this.state ; 

    // console.log( 'final type : ', typeof totalPrice ) ;
    console.log( 'totalPrice : ', totalPrice ) ;
    console.log( 'finalPrice : ', finalPrice ) ;


    crntTotal = String( crntTotal ) ; 
    addTotal = String( addTotal ) ; 
    finalPrice = isNaN( finalPrice ) || addTotal < 1 ? '' : String( Math.floor( finalPrice ) ) ; 
    totalPrice = totalPrice < 1 ? '' : String( totalPrice ) ; 
    totalNum = totalNum < 1 ? '' : String( totalNum ) ; 
    
    let { _changeHandler, _resetHandler } = this ; 

    return (
      <ScrollView style={styles.scrollView}>
        <View>
          
          <View style={ styles.top }>
            {/* <Text style={ styles.topTitle }>물타기 계산기</Text> */}
            <Text style={ styles.topTitle }>계산기 1</Text>
          </View>

          <View style={ styles.wrapper }>
            <View style={ styles.item }>
              <Text style={ styles.title }>현재 보유 가격</Text>
              <View style={ styles.cont }>
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 가격"          
                    onChangeText={ value => _changeHandler( value, 'crntPrice') }
                    style={ styles.inputStyles }
                    value={ crntPrice }
                    ref={ ref => this._buyPrice = ref }
                  />
                  <Text style={ styles.unit }>원</Text>
                </View>
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 수량"
                    onChangeText={ value => _changeHandler( value, 'crntNum') }
                    style={ styles.inputStyles }
                    value={ crntNum }
                  />    
                  <Text style={ styles.unit }>주</Text>
                </View>      
                {/* <View style={ styles.group }>      
                  <TextInput 
                    style={ styles.inputStyles }
                    placeholder="매수 금액"
                    value={ crntTotal }
                    editable = {false}
                  />
                  <Text style={ styles.unit }>원</Text>
                </View> */}
              </View>
            </View>
            <View style={ styles.item }>
              <Text style={ styles.title }>추매 가격</Text>
              <View style={ styles.cont }>
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 가격"          
                    onChangeText={ value => _changeHandler( value, 'addPrice') }
                    style={ styles.inputStyles }
                    value={ addPrice }
                  />
                  <Text style={ styles.unit }>원</Text>
                </View>
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 수량"
                    onChangeText={ value => _changeHandler( value, 'addNum') }
                    style={ styles.inputStyles }
                    value={ addNum }
                  />    
                  <Text style={ styles.unit }>주</Text>
                </View>      
                {/* <View style={ styles.group }>      
                  <TextInput 
                    style={ styles.inputStyles }
                    placeholder="매수 금액"
                    value={ addTotal }
                    editable = {false}
                  />
                  <Text style={ styles.unit }>원</Text>
                </View> */}
              </View>
            </View>
            <View style={ styles.item }>
              <Text style={ styles.title }>최종 평균 단가</Text>
              <View style={ styles.cont }>
                <View style={ styles.group }>
                  <TextInput 
                    // placeholder="매수 가격"          
                    editable = {false}
                    style={ styles.inputFinalStyles }
                    value={ finalPrice }
                  />
                  <Text style={ styles.unit }>원</Text>
                </View>
                {/* <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 수량"
                    editable = {false}
                    style={ styles.inputStyles }
                    value={ totalNum }
                  />    
                  <Text style={ styles.unit }>주</Text>
                </View>       */}
                {/* <View style={ styles.group }>      
                  <TextInput 
                    style={ styles.inputStyles }
                    placeholder="매수 금액"
                    value={ totalPrice }
                    editable = {false}
                  />
                  <Text style={ styles.unit }>원</Text>
                </View> */}
              </View>
            </View>
          </View>

          <View style={ styles.top }>
            {/* <Text style={ styles.topTitle }>목표 단가 계산기</Text> */}
            <Text style={ styles.topTitle }>계산기 2</Text>
          </View>
          <View style={ styles.wrapper }>
            <View style={ styles.item }>
              <Text style={ styles.title }>목표 단가 / 매수 단가</Text>
              <Text>위 보유가격을 기준으로 계산됩니다.</Text>
              <View style={ styles.cont }>
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="목표 단가"          
                    onChangeText={ value => _changeHandler( value, 'goalNextPrice') }
                    style={ styles.inputStyles }
                    value={ goalNextPrice }
                    ref={ ref => this._buyPrice = ref }
                  />
                  <Text style={ styles.unit }>원</Text>
                </View> 
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 단가"          
                    onChangeText={ value => _changeHandler( value, 'goalPrevPrice') }
                    style={ styles.inputStyles }
                    value={ goalPrevPrice }
                    ref={ ref => this._buyPrice = ref }
                  />
                  <Text style={ styles.unit }>원</Text>
                </View> 
              </View>
            </View>
         
            <View style={ styles.item }>
              <Text style={ styles.title }>매수 필요 수량/금액</Text>
              <View style={ styles.cont }>
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 필요 수량"          
                    onChangeText={ value => _changeHandler( value, 'goalBuyNum') }
                    style={ styles.inputStyles }
                    value={ goalBuyNum }
                    ref={ ref => this._buyPrice = ref }
                  />
                  <Text style={ styles.unit }>주</Text>
                </View> 
                <View style={ styles.group }>
                  <TextInput 
                    placeholder="매수 필요 금액"          
                    onChangeText={ value => _changeHandler( value, 'goalBuyPrice') }
                    style={ styles.inputStyles }
                    value={ goalBuyPrice }
                    ref={ ref => this._buyPrice = ref }
                  />
                  <Text style={ styles.unit }>원</Text>
                </View> 
              </View>
            </View>
          </View>
          <Button title="reset" onPress={ _resetHandler } />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  test : {
    paddingBottom : 800 ,
    borderWidth : 1 
  } , 
  scrollView : {} ,
  wrapper : {
    padding: 10 ,
    paddingBottom : 50 ,
  },  
  top : {
    height:60 ,
    padding: 10 , 
    display: 'flex' ,
    backgroundColor : 'indianred' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
  } , 
  topTitle : {
    color : '#fff' ,
    fontSize : 18 , 
    letterSpacing : -1
  },  
  cont : {
    display : 'flex' ,
    flexDirection : 'row'  
  } ,   
  title : {
    marginBottom : 5 ,
    fontSize : 16 ,
    letterSpacing : -1
  } ,
  group : {
    display: 'flex' ,
    flexDirection : 'row' ,
    flex : 1 , 
    alignItems : "center",
  } , 
  unit : {
    paddingLeft : 5 ,
    // alignItems : 'center' ,
    // justifyContent : 'center' ,
  } , 
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  inputStyles : {
    flex : 1 ,
    height: 40 ,
    fontSize : 14 , 
    borderColor: '#aaa' ,
    borderWidth : 1 ,
    marginBottom: 5 ,
    color : '#333' ,
    textAlign : 'right'
  } ,
  inputFinalStyles : {
    flex : 1 ,
    height: 40 ,
    fontSize : 18 , 
    borderColor: '#aaa' ,
    marginBottom: 5 ,
    color : '#333' ,
    fontWeight : 'bold' ,
    textAlign : 'right'
  }
});

export default App;
