import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute, useNavigation } from "@react-navigation/native";
import { GameParams } from '../../@types/navigation';
import { Entypo} from "@expo/vector-icons";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { THEME } from '../../theme';
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from '../../components/Heading';
import  React, { useEffect, useState} from 'react';
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

interface RouteParams {
    id: string,
    title: string,
    bannerUrl: string
}

export function Game() {
    const route = useRoute();
    const game = route.params as GameParams;
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    useEffect(() => {
        fetch(`http://192.168.0.144:3333/games/${game.id}/ads`)
             .then(response => response.json())
             //.then(data => console.log(data));
              
             .then(data => setDuos(data));
    }, []);

    const [discordDuoSelect, setDiscordDuoSelect ] = useState("");

    async function getDiscorduser( idAds: string){
        await fetch(`http:///192.168.0.144:3333/ads/${idAds}/discord`)
              .then(response => response.json())
              .then(data => setDiscordDuoSelect(data.discord));
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name="chevron-thin-left"
                                color={THEME.COLORS.CAPTION_300} 
                                size={20}>
                        </Entypo>

                    </TouchableOpacity>
                    <Image source={logoImg} style={styles.logo} />
                    <View style={styles.right}/>
                </View>
                <Image source={{ uri: game.bannerUrl}} style={styles.cover} resizeMode="cover" />
                <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

                <FlatList data={duos} keyExtractor={item => item.id} 
                          renderItem={( {item} ) => ( <DuoCard data={item} onConnect={() => getDiscorduser(item.id)} />  )} 
                          horizontal
                          contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContainer ]}
                          showsHorizontalScrollIndicator={false}
                          style={styles.containerList}
                          ListEmptyComponent={ () => (  
                           <Text style={styles.emptyListText}>Não há anúncios para este jogo.</Text> 
                          ) }/>
                <DuoMatch visible={discordDuoSelect.length > 0} discord={discordDuoSelect} onClose={ () => setDiscordDuoSelect("")} />
            </SafeAreaView>
            
        </Background>
    );

}