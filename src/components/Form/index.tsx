import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { api } from '../../libs/api';
import { captureScreen } from 'react-native-view-shot'
import * as FileSytem from 'expo-file-system'

import { styles } from './styles';
import { Screenshot } from '../Screenshot';
import { Button } from '../Button';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void,
    onFeedbackSend: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSend }: Props) {

    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const [comment, setComment] = useState<string>('')


    const [screenshot, setScreenshot] = useState<string | null>(null)

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri))
            .catch((erro) => console.log(erro))
    }
    function handleScreenshotRemove() {
        setScreenshot(null)
    }


    async function handleSendFeedback() {

        if (isSendingFeedback) {
            return
        }

        setIsSendingFeedback(true)

        const screenshotBase64 = screenshot && await FileSytem.readAsStringAsync(screenshot, { encoding: 'base64' })

        try {

            await api.post('feedbacks',
                {
                    type: feedbackType,
                    screenshot: `data:image/png;base64, ${screenshotBase64}`,
                    comment
                }
            )

            onFeedbackSend();

        } catch (error) {
            console.log(error)
            setIsSendingFeedback(false)

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight='bold'
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image
                        style={styles.image}
                        source={feedbackTypeInfo.image} />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                multiline
                style={styles.input}
                placeholder="Algo n??o est?? funcionando bem? Queremos corrigir. Conte com detalhes o que est?? acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setComment}
            />

            <View style={styles.footer}>
                <Screenshot
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
            </View>

        </View>
    );
}