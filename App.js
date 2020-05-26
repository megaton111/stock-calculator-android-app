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

import Intl from 'react-native-intl' ;

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


  _numberFormat = value => {
    let reg = /(^[+-]?\d+)(\d{3})/;
    let n = String( value );
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n ;
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

    let { _changeHandler, _resetHandler, _numberFormat } = this ; 

    crntTotal = String( crntTotal ) ; 
    addTotal = String( addTotal ) ; 
    finalPrice = isNaN( finalPrice ) || addTotal < 1 ? '' : _numberFormat( Math.floor( finalPrice ) ) ; 
    // finalPrice = isNaN( finalPrice ) || addTotal < 1 ? '' : String( Math.floor( finalPrice ) ) ; 
    totalPrice = totalPrice < 1 ? '' : String( totalPrice ) ; 
    totalNum = totalNum < 1 ? '' : String( totalNum ) ; 
    // crntPrice = _numberFormat( crntPrice ) ;

    console.log({ finalPrice }) ;

    return (
      <ScrollView style={styles.scrollView}>
        <View>

          {/* <View style={ styles.top }>
            <Text style={ styles.topTitle }>추매 계산기</Text>
          </View> */}

          <View style={ styles.crntInfo }>
            <Text style={ styles.crntTxt }>현재 보유 가격</Text>
            <View style={ styles.cont }>
              <View style={ styles.group }>
                <TextInput 
                  placeholder="매입 가격"   
                  keyboardType="numeric"       
                  onChangeText={ value => _changeHandler( value, 'crntPrice') }
                  style={ styles.inputCrntStyles }
                  value={ crntPrice }
                  ref={ ref => this._buyPrice = ref }
                />
                <Text style={ styles.crntUnit }>원</Text>
              </View>
              <View style={ styles.group }>
                <TextInput 
                  placeholder="보유 수량"
                  keyboardType="numeric"
                  onChangeText={ value => _changeHandler( value, 'crntNum') }
                  style={ styles.inputCrntStyles }
                  value={ crntNum }
                />    
                <Text style={ styles.crntUnit }>주</Text>
              </View>    
            </View>
          </View>
          {/* end of 현재 보유 가격 */}

          
          {/* <View style={ styles.subTitArea }>
            <Text style={ styles.subTit }>평균 단가 계산하기</Text>
          </View> */}


          <View style={ styles.item }>
            {/* <Text style={ styles.txt }>추매 가격 / 수량</Text> */}
            {/* <Text style={ styles.desc }>추매할 가격과 수량을 입력하세요.</Text> */}
            <View style={ styles.cont }>
              <View style={ styles.groupTxt }>
                <Text style={ styles.txt }>추가 매수 가격</Text>
              </View>
              <View style={ styles.group }>
                <TextInput 
                  // placeholder="추가 매수 가격"     
                  keyboardType="numeric"     
                  onChangeText={ value => _changeHandler( value, 'addPrice') }
                  style={ styles.inputStyles }
                  value={ addPrice }
                />
                <Text style={ styles.unit }>원</Text>
              </View>
            </View>
            <View style={ styles.cont }>
              <View style={ styles.groupTxt }>
                <Text style={ styles.txt }>추가 매수 수량</Text>
              </View>
              <View style={ styles.group }>
                <TextInput 
                  // placeholder="추가 매수 수량"
                  keyboardType="numeric"
                  onChangeText={ value => _changeHandler( value, 'addNum') }
                  style={ styles.inputStyles }
                  value={ addNum }
                />    
                <Text style={ styles.unit }>주</Text>
              </View>
            </View>
          </View>
          {/* end of 추매 가격 */}

          <View style={ styles.item }>
            <View style={ styles.cont }>
              <View style={ styles.groupTxt }>
                <Text style={ styles.txt }>최종 평균 단가</Text>
              </View>
              <View style={ styles.group }>
                {/* <TextInput 
                  editable = {false}
                  style={ styles.inputFinalStyles }
                  value={ finalPrice }
                /> */}
                {/* <Text style={ styles.inputFinalStyles }>25,900</Text> */}
                <Text style={ styles.inputFinalStyles }>{ finalPrice }</Text>
                <Text style={ styles.unit }>원</Text>
              </View>
            </View>
          </View>
          {/* end of 최종 평균 단가 */}

          {/* <View style={ styles.subTitArea }>
            <Text style={ styles.subTit }>목표 단가 계산하기</Text>
          </View>

          <View style={ styles.item }>
            <Text style={ styles.desc }>위 현재 보유 가격을 기준으로 계산됩니다.</Text>
            <Text style={ styles.txt }>목표 평균 단가 / 매수 단가</Text>
            <View style={ styles.cont }>
              <View style={ styles.group }>
                <TextInput 
                  placeholder="목표 평균 단가" 
                  onChangeText={ value => _changeHandler( value, 'goalNextPrice') }
                  style={ styles.inputStyles }
                  value={ goalNextPrice }
                />
                <Text style={ styles.unit }>원</Text>
              </View> 
              <View style={ styles.group }>
                <TextInput 
                  placeholder="매수 단가"          
                  onChangeText={ value => _changeHandler( value, 'goalPrevPrice') }
                  style={ styles.inputStyles }
                  value={ goalPrevPrice }
                />
                <Text style={ styles.unit }>원</Text>
              </View> 
            </View>
          </View> */}
          {/* end of 목표 단가 / 매수 단가 */}
        
          {/* <View style={ styles.item }>
            <Text style={ styles.txt }>매수 필요 수량 / 매입 필요 금액</Text>
            <View style={ styles.cont }>
              <View style={ styles.group }>
                <TextInput 
                  onChangeText={ value => _changeHandler( value, 'goalBuyNum') }
                  style={ styles.inputFinalStyles }
                  value={ goalBuyNum }
                  editable = {false}
                />
                <Text style={ styles.unit }>주</Text>
              </View> 
              <View style={ styles.group }>
                <TextInput 
                  onChangeText={ value => _changeHandler( value, 'goalBuyPrice') }
                  style={ styles.inputFinalStyles }
                  value={ goalBuyPrice }
                  editable = {false}
                />
                <Text style={ styles.unit }>원</Text>
              </View> 
            </View>
          </View> */}
          {/* end of 매수 필요 수량/금액 */}


          <View style={ styles.btns }>
            <Button title="입력값 초기화" onPress={ _resetHandler } color="indianred" />
          </View>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper : {
    padding: 10 ,
  },  
  top : {
    height:40 ,
    padding: 10 , 
    display: 'flex' ,
    backgroundColor : 'indianred' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
  } , 
  crntInfo : {
    backgroundColor : '#596275' ,
    padding: 10 ,
    paddingTop : 20 , 
    paddingBottom : 20 , 
    marginBottom : 20 ,
  }, 
  crntTxt : {
    fontSize : 28 , 
    color : "#fff" , 
    letterSpacing : -2 ,
    fontWeight : "bold" ,
    textAlign : "center" ,
    marginBottom : 10 , 
  } ,
  topTitle : {
    color : '#fff' ,
    fontSize : 14 , 
    letterSpacing : -1 ,
    fontWeight : "bold" 
  },  
  subTitArea : {
    padding: 10 ,
    paddingTop : 5 , 
    paddingBottom : 5 , 
    marginBottom : 5 ,
    backgroundColor : "#303952"
  } ,
  subTit : {
    fontSize : 14 , 
    letterSpacing : -1 ,
    color: "#fff" ,
  } ,
  cont : {
    display : 'flex' ,
    // flexDirection : 'row'  
  } ,   
  item : {
    paddingLeft : 10 ,
    paddingRight : 10 ,
  } ,
  txt : {
    display: 'flex' ,
    flex: 1 , 
    marginBottom : 5 ,
    fontSize : 14 ,
    letterSpacing : -1 ,
    fontWeight : "bold" ,
  } ,
  group : {
    display: 'flex' ,
    flexDirection : 'row' ,
    flex : 2 , 
    alignItems : "center",
  } , 
  groupTxt : {
    display: 'flex' ,
    flexDirection : 'row' ,
    flex : 1 , 
    alignItems : "center", 
    // borderWidth : 1 ,
  } , 
  unit : {
    paddingRight : 5 , 
    paddingLeft : 5 , 
    // alignItems : 'center' ,
    // justifyContent : 'center' ,
  } , 
  crntUnit : {
    color: "#fff" ,
    paddingRight : 5 , 
    paddingLeft : 5 , 
  } , 
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  inputStyles : {
    flex : 1 ,
    height: 40 ,
    fontSize : 18 , 
    borderColor: '#aaa' ,
    // borderBottomWidth : 1 ,
    borderWidth : 1 , 
    marginBottom: 5 ,
    color : '#333' ,
    textAlign : 'right' ,
    paddingRight : 10 ,
    paddingLeft : 10 ,
  } ,
  inputCrntStyles : {
    flex : 1 ,
    height: 40 ,
    fontSize : 18 , 
    marginBottom: 5 ,
    color : '#000' ,
    textAlign : 'right' ,
    paddingRight : 10 ,
    paddingLeft : 10 ,
    // textAlignVertical : 'center' ,
    backgroundColor : "#fff" 
  } ,
  inputFinalStyles : {
    flex : 1 ,
    height: 50 ,
    fontSize : 36 , 
    borderColor: '#aaa' ,
    marginBottom: 5 ,
    color : '#333' ,
    fontWeight : 'bold' ,
    textAlign : 'right' ,
    paddingRight : 5 , 
    // justifyContent : 'center' ,
    // alignItems : 'center' ,
    // borderWidth :  1 , 
    textAlignVertical : 'center' ,
  } , 
  btns : {
    padding:10 ,
    display: 'flex' ,
  } ,
  desc : {
    fontSize : 12 , 
    color : "#888" ,
    textAlign : "right" ,
    letterSpacing : -1
  } , 
  btn : {
    height : 60 ,
    backgroundColor : "indianred" ,
    color : "red" ,
  }
});

export default App;
