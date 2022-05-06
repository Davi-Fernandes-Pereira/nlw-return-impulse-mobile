import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Options } from '../Options';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes';


import { styles } from './styles';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes

export const Widget = gestureHandlerRootHOC(() => {


    const [feedbackType, setFeedbacktype] = useState<FeedbackType | null>(null)

    const [feedbackSent, setFeedbackSent] = useState(false)

    const bottomSheetref = useRef<BottomSheet>(null);

    function handleOpen() {
        bottomSheetref.current?.expand();
    }

    function handleRestartFeedback() {
        setFeedbacktype(null)
        setFeedbackSent(false)
    }

    function handleFeedbackSend() {
        setFeedbackSent(true)
    }


    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={handleOpen}
            >
                <ChatTeardropDots
                    size={24}
                    weight='bold'
                    color={theme.colors.text_on_brand_color} />

            </TouchableOpacity>


            <BottomSheet
                ref={bottomSheetref}
                snapPoints={[1, 280]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >

                {
                    feedbackSent ?
                        <Success onSendAnotherFeedback={handleRestartFeedback} />
                        :
                        <>
                            {
                                feedbackType
                                    ?
                                    <Form onFeedbackCanceled={handleRestartFeedback} onFeedbackSend={handleFeedbackSend} feedbackType={feedbackType} />
                                    :
                                    <Options onFeedbackTypeChanged={setFeedbacktype} />
                            }

                        </>
                }

            </BottomSheet>
        </>
    );
}) as any
