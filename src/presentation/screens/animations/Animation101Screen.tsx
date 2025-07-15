import React, { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { colors } from '../../../config/theme/theme';

export default function Animation101Screen() {
    const animateOpacity = useRef(new Animated.Value(0)).current;
    const animatedTop = useRef(new Animated.Value(0)).current;
    const animatedScale = useRef(new Animated.Value(1)).current;
    const animatedRotation = useRef(new Animated.Value(0)).current;
    const [isAnimating, setIsAnimating] = useState(false);

    // Animaciones para botones
    const fadeInButtonScale = useRef(new Animated.Value(1)).current;
    const fadeOutButtonScale = useRef(new Animated.Value(1)).current;
    const resetButtonScale = useRef(new Animated.Value(1)).current;

    const fadeIn = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Animación del botón
        Animated.sequence([
            Animated.timing(fadeInButtonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(fadeInButtonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();

        // Animaciones de la caja
        Animated.parallel([
            Animated.timing(animatedTop, {
                toValue: -100,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.5))
            }),
            Animated.timing(animateOpacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad)
            }),
            Animated.timing(animatedScale, {
                toValue: 1.1,
                duration: 400,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.2))
            }),
            Animated.timing(animatedRotation, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.5))
            })
        ]).start(({ finished }) => {
            if (finished) {
                setIsAnimating(false);
                console.log('FadeIn completed');
            }
        });
    }, [animatedTop, animateOpacity, animatedScale, animatedRotation, isAnimating, fadeInButtonScale]);

    const fadeOut = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Animación del botón
        Animated.sequence([
            Animated.timing(fadeOutButtonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(fadeOutButtonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();

        // Animaciones de la caja
        Animated.parallel([
            Animated.timing(animatedTop, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.in(Easing.back(1.2))
            }),
            Animated.timing(animateOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.in(Easing.quad)
            }),
            Animated.timing(animatedScale, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
                easing: Easing.in(Easing.back(1.2))
            }),
            Animated.timing(animatedRotation, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
                easing: Easing.in(Easing.back(1.2))
            })
        ]).start(({ finished }) => {
            if (finished) {
                setIsAnimating(false);
                console.log('FadeOut completed');
            }
        });
    }, [animatedTop, animateOpacity, animatedScale, animatedRotation, isAnimating, fadeOutButtonScale]);

    const resetAnimation = useCallback(() => {
        // Animación del botón
        Animated.sequence([
            Animated.timing(resetButtonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(resetButtonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();

        // Reset de valores
        animatedTop.setValue(0);
        animateOpacity.setValue(0);
        animatedScale.setValue(1);
        animatedRotation.setValue(0);
        setIsAnimating(false);
    }, [animatedTop, animateOpacity, animatedScale, animatedRotation, resetButtonScale]);

    const rotation = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

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
                        onPress={fadeIn}
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
