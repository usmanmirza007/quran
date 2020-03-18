

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SplashScreen from '../Screens/SplashScreen';
import TabScreens from '../Screens/TabScreens';
import {createStackNavigator} from 'react-navigation-stack';
import AyahDetail from '../Screens/AyahDetail';
import SourateScreen from '../HomeScreens/Sourate';
import QiblaDatails from '../Screens/QiblaDetails';

const Route= createStackNavigator({
        Splash:{
            screen:SplashScreen,
            navigationOptions:{
                header:null
            }
        },
        AyahDetail:{
            screen:AyahDetail,
            navigationOptions:{
                header:null
            }
        },
        QiblaDatails:{
            screen:QiblaDatails,
            navigationOptions:{
                header:null
            }
        },
        
        Tab:{
            screen:TabScreens,
            navigationOptions:{
                header:null
            }
        }
    })
   
      
export default createAppContainer(Route);
