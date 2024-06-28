import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';


const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const BottomSheet = () => {
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50
    const MIN_TRANSLATE_Y = 100
    const translateY = useSharedValue(0)
    // for saving the previous position of the sheet
    const context = useSharedValue({ y: 0 })
    // in onstart we are saving the previous position of the sheet
    const gesture = Gesture.Pan().onStart((event) => {
        context.value.y = translateY.value
    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        // fix the max y so that it doesnt get out from bottom
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    }).onEnd((event) => {
        // if the sheet is not at the top or bottom then set the sheet to the top or bottom
        if (translateY.value > -SCREEN_HEIGHT / 3) {
            translateY.value = withSpring(-SCREEN_HEIGHT / 6 , { damping: 50 });
        }
        else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
            translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
        }

    });
    // use useEffect to set the translateY value to 0 when the sheet is coming with spring like animation
    useEffect(() => {
        translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 50 })
    }, [])
    const rBottomSheetStyle = useAnimatedStyle(() => {
        // add dynamic border radius for 100% height
        const borderRadius = interpolate(translateY.value, [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y], [25, 5],
            Extrapolate.CLAMP);
        return {
            borderRadius,
            transform: [{ translateY: translateY.value }],
        };
    });
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
                <View style={styles.stickyLine}></View>
                <Text>Bottom Sheet</Text>
            </Animated.View>
        </GestureDetector>

    )
}

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: "#273238",
        width: '100%',
        height: SCREEN_HEIGHT,
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
        padding: 5,
    },
    stickyLine: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 5,
    },
})