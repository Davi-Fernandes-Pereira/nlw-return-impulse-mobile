import React from 'react';
import { Text, View } from 'react-native';
import { Copyright } from '../Copyright';
import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles';
import { Option } from '../Option';
import { FeedbackType } from '../Widget';

interface Props {
    onFeedbackTypeChanged: (feedbackType: FeedbackType) => void
}

export function Options({ onFeedbackTypeChanged }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} >
                Deixe seu feedback
            </Text>

            <View style={styles.options}>
                {
                    Object
                        .entries(feedbackTypes)
                        .map(([key, valeu]) => (
                            <Option
                                key={key}
                                title={valeu.title}
                                image={valeu.image}
                                onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
                            />
                        ))
                }
            </View >

            <Copyright />

        </View>
    );
}