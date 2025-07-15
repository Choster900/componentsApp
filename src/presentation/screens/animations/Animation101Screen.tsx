import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { colors } from '../../../config/theme/theme';
import { useAnimation } from '../../hooks/useAnimation';

export default function Animation101Screen() {


    const {
        fadeIn,
        fadeOut,
        resetAnimation,
        startMovingTopPosition,
        animateOpacity,
        animatedTop,
        animatedScale,
        animatedRotation,
        isAnimating,
        rotation,
        fadeInButtonScale,
        fadeOutButtonScale,
        resetButtonScale
    } = useAnimation();

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.purpleBox,
                    {
                        opacity: animateOpacity,
                        transform: [
                            { translateY: animatedTop },
                            { scale: animatedScale },
                            { rotate: rotation }
                        ]
                    }
                ]}
            />

            <View style={styles.buttonContainer}>
                <Animated.View style={{ transform: [{ scale: fadeInButtonScale }] }}>
                    <Pressable
                        style={[
                            styles.button,
                            styles.fadeInButton,
                            isAnimating && styles.buttonDisabled
                        ]}
                        onPress={() => {
                            fadeIn({});
                           /*  startMovingTopPosition({
                                initialPosition: -100,
                                toValue: -100,
                                duration: 1000,
                                easing: Easing.elastic(1.0)
                            }); */
                        }}
                        disabled={isAnimating}
                    >
                        <Text style={[styles.buttonText, styles.fadeInButtonText]}>Fade In</Text>
                    </Pressable>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: fadeOutButtonScale }] }}>
                    <Pressable
                        style={[
                            styles.button,
                            styles.fadeOutButton,
                            isAnimating && styles.buttonDisabled
                        ]}
                        onPress={fadeOut}
                        disabled={isAnimating}
                    >
                        <Text style={[styles.buttonText, styles.fadeOutButtonText]}>Fade Out</Text>
                    </Pressable>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: resetButtonScale }] }}>
                    <Pressable
                        style={[styles.button, styles.resetButton]}
                        onPress={resetAnimation}
                    >
                        <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    purpleBox: {
        backgroundColor: colors.primary,
        width: 150,
        height: 150,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 80,
        paddingHorizontal: 20,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 4,
        minWidth: 90,
        alignItems: 'center',
        shadowColor: 'transparent',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    fadeInButton: {
        backgroundColor: 'transparent',
        borderColor: '#333',
        borderWidth: 1,
    },
    fadeInButtonText: {
        color: '#333',
        fontWeight: '500',
    },
    fadeOutButton: {
        backgroundColor: 'transparent',
        borderColor: '#333',
        borderWidth: 1,
    },
    fadeOutButtonText: {
        color: '#333',
        fontWeight: '500',
    },
    resetButton: {
        backgroundColor: 'transparent',
        borderColor: '#666',
        borderWidth: 1,
    },
    resetButtonText: {
        color: '#666',
        fontWeight: '500',
    },
    buttonDisabled: {
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});
