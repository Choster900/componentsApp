import { useRef, useState, useCallback } from "react";
import { Animated, Easing } from "react-native";


export const useAnimation = () => {

    const animateOpacity = useRef(new Animated.Value(0)).current;
    const animatedTop = useRef(new Animated.Value(0)).current;
    const animatedScale = useRef(new Animated.Value(1)).current;
    const animatedRotation = useRef(new Animated.Value(0)).current;
    const [isAnimating, setIsAnimating] = useState(false);

    // Animaciones para botones
    const fadeInButtonScale = useRef(new Animated.Value(1)).current;
    const fadeOutButtonScale = useRef(new Animated.Value(1)).current;
    const resetButtonScale = useRef(new Animated.Value(1)).current;

    const fadeIn = useCallback(({ duration = 300, toValue = 1 }) => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Animación del botón
        Animated.sequence([
            Animated.timing(fadeInButtonScale, {
                toValue: toValue,
                duration: duration,
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

    const startMovingTopPosition = ({
        initialPosition = 0,
        toValue = 0,
        duration = 500,
        easing = Easing.linear,
        callback = () => {}
    }) => {
        animatedTop.setValue(initialPosition);
        Animated.timing(animatedTop, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: true,
            easing: easing
        }).start(({ finished }) => {
            if (finished) {
                callback();
            }
        });
    };

    return {
        fadeIn,
        fadeOut,
        resetAnimation,
        setIsAnimating,
        startMovingTopPosition,
        rotation,
        animateOpacity,
        animatedTop,
        animatedScale,
        animatedRotation,
        fadeInButtonScale,
        fadeOutButtonScale,
        resetButtonScale,
        isAnimating,
    };
}
