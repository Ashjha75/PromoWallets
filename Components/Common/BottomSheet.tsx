import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const BottomSheet = forwardRef((props, ref) => {
    const opacity = useSharedValue(0);
    const [isVisible, setIsVisible] = useState(false)
    const percentageSnaps = [0, 50, 60];
    const snapAt = -SCREEN_HEIGHT * (percentageSnaps[1] / 100);
    const snaps = percentageSnaps.map(percentage => -SCREEN_HEIGHT * (percentage / 100));
    const MAX_TRANSLATE_Y = snaps[2] - (SCREEN_HEIGHT * 0.05); // 5% more than snaps[2]
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    
    const gesture = Gesture.Pan().onStart(() => {
        context.value.y = translateY.value
    }).onUpdate((event) => {
        translateY.value = Math.max(event.translationY + context.value.y, MAX_TRANSLATE_Y);
    }).onEnd((event) => {
        const isMovingUp = event.velocityY < 0;
        const currentPercentage = -translateY.value / SCREEN_HEIGHT * 100;

        let targetSnap;
        if (currentPercentage >= percentageSnaps[2] && currentPercentage <= percentageSnaps[2] + 5) {
            targetSnap = snaps[2];
        } else if (isMovingUp) {
            targetSnap = currentPercentage < percentageSnaps[1] ? snaps[1] : snaps[2];
        } else {
            if (currentPercentage > percentageSnaps[1]) {
                targetSnap = snaps[1];
            } else {
                targetSnap = snaps[0];
                runOnJS(setIsVisible)(false);
            }
        }

        translateY.value = withSpring(targetSnap, {
            damping: 20,
            stiffness: 90,
        });
    });

    const closeSheet = () => {
        translateY.value = withSpring(SCREEN_HEIGHT, { damping: 50 }, () => {
            runOnJS(setParentInvisible)();
        });
        runOnJS(setIsVisible)(false);
    };

    const setParentInvisible = () => {
        opacity.value = 0;
    };

    const openSheet = () => {
        translateY.value = withSpring(snapAt, { damping: 50 });
        opacity.value = withSpring(1, { damping: 50 });
        runOnJS(setIsVisible)(true);
    };

    useImperativeHandle(ref, () => ({
        closeSheet, openSheet,
    }));

    const rBottomSheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const rParentStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <>
            {isVisible ? (
                <Animated.View style={[{ flex: 1, width: "100%", height: "100%", position: 'absolute' }, rParentStyle]}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <TouchableWithoutFeedback onPress={closeSheet}>
                            <View style={{ flex: 1 }} />
                        </TouchableWithoutFeedback>
                        <GestureDetector gesture={gesture}>
                            <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
                                <View style={styles.stickyLine}></View>
                                <Text>Bottom Sheet</Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                </Animated.View>
            ) : null}
        </>
    )
})

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
        alignSelf: "center"
    },
    stickyLine: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 5,
    },
});
