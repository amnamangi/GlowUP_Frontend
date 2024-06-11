import {StyleSheet} from 'react-native';
import { colors } from '../../../services/utilities/colors';
import { sizes } from '../../../services/utilities/sizes';
import { fontSize } from '../../../services/utilities/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: sizes.screenHeight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.04,
  },
  arrowTop: {
    marginLeft: sizes.screenWidth * 0.04,
  },
  headerContainer: {
    width: sizes.screenWidth * 0.8,
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSize.h7,
    color: colors.black,
    fontWeight: '700',
  },
  containerBody: {
    marginTop: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.06,
  },
  aboutContainer: {
    marginTop: sizes.screenHeight * 0.02,
  },
  aboutHeading: {
    color: colors.black,
    fontWeight: '500',
    fontSize: fontSize.medium,
  },
  aboutDescription: {
    fontSize: fontSize.medium,
    color: colors.gray,
    // fontWeight: '500',
  },
  serviceDetailContainer: {
    marginTop: sizes.screenHeight * 0.03,
  },
  tableHeadingRow: {
    flexDirection: 'row',
    backgroundColor: colors.lightPurple,
    paddingHorizontal: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.01,
    borderRadius: sizes.screenHeight * 0.01,
    justifyContent: 'space-between',
  },
  tableServiceHeading: {
    fontSize: fontSize.medium,
    color: colors.gray,
    fontWeight: '500',
    textAlign: 'center',
  },
  tablePriceHeading: {
    fontSize: fontSize.medium,
    color: colors.gray,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: sizes.screenWidth * 0.1,
  },
  serviceContentRow: {
    flexDirection: 'row',
    paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenHeight * 0.016,
    justifyContent: 'space-between',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: sizes.screenHeight * 0.001,
  },
  serviceNameText: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
  },
  priceText: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: sizes.screenWidth * 0.13,
  },

  imageView: {
    paddingLeft: sizes.screenWidth * 0.06,
    marginTop: sizes.screenHeight * 0.03,
  },
  imageHeading: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
  },
  imageContainer: {
    height: sizes.screenHeight * 0.25,
    width: sizes.screenWidth * 0.34,
    borderRadius: sizes.screenWidth * 0.02,
    marginTop: sizes.screenHeight * 0.01,
    marginRight: sizes.screenWidth * 0.02,
    resizeMode: 'cover',
  },
  ScrollViewContainer: {
    marginTop: sizes.screenHeight * 0.02,
  },
  modalView:{
    backgroundColor:colors.background,
    width:sizes.screenWidth* 0.3,
    marginTop:sizes.screenHeight* 0.09,
    alignSelf:'flex-end',
    marginRight:sizes.screenHeight* 0.02,
    paddingHorizontal:sizes.screenHeight*0.02,
    paddingVertical:sizes.screenHeight* 0.01,
    borderRadius:sizes.screenWidth*0.02,
    borderWidth:sizes.screenWidth* 0.002,
    borderColor:colors.barGray,

  },
  modalRow:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:sizes.screenHeight* 0.01,
    marginBottom:sizes.screenHeight* 0.01
  },
  modalText:{
    fontSize:fontSize.smallM,
    color:colors.black,
    fontWeight:'500',
    marginStart:sizes.screenWidth* 0.02
  }
});
