import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { THEME } from "../../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { Heading } from "../Heading";
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string,
    onClose: () => void
}

export function DuoMatch ( {discord, onClose, ...rest} : Props ) {

    const [isCopiando, setIsCopiando] = useState(false);

    async function handleDiscordToClipboard(){
        setIsCopiando(true);
        await Clipboard.setStringAsync(discord);
        Alert.alert("Discord copiado","Usuário copiado para área de transferência para você procurá-lo no Discord");
        setIsCopiando(false);
    }

    return (
        <Modal {...rest} transparent={true} statusBarTranslucent={true} animationType={"fade"}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose} >
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>
                    
                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

                    <Heading title="Let's Play!" subtitle="Agora é só começar a jogar!" style={{ alignItems: "center", marginTop: 24}}></Heading>
                    <Text style={styles.label}>
                        Adicione ao Discord
                    </Text>

                    <TouchableOpacity style={styles.discordButton} onPress={handleDiscordToClipboard} disabled={isCopiando}>
                        <Text style={styles.discord}>
                            { isCopiando ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> :discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}