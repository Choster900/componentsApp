import { useRef, useState, useCallback } from "react";
import { Animated, Easing } from "react-native";

// Configuraciones por defecto
const DEFAULT_CONFIGS = {
    fadeIn: {
        duration: 300,
        toValue: 1,
        opacity: {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.quad)
        },
        scale: {
            toValue: 1.1,
            duration: 400,
            easing: Easing.out(Easing.back(1.2))
        },
        rotation: {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.back(1.5))
        },
        translate: {
            toValue: -100,
            duration: 800,
            easing: Easing.out(Easing.back(1.5))
        },
        button: {
            pressValue: 0.95,
            duration: 150,
            returnDuration: 100
        }
    },
    fadeOut: {
        opacity: {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.quad)
        },
        scale: {
            toValue: 1,
            duration: 400,
            easing: Easing.in(Easing.back(1.2))
        },
        rotation: {
            toValue: 0,
            duration: 700,
            easing: Easing.in(Easing.back(1.2))
        },
        translate: {
            toValue: 0,
            duration: 700,
            easing: Easing.in(Easing.back(1.2))
        },
        button: {
            pressValue: 0.9,
            duration: 100,
            returnDuration: 100
        }
    },
    reset: {
        button: {
            pressValue: 0.9,
            duration: 100,
            returnDuration: 100
        }
    },
    customMove: {
        duration: 500,
        easing: Easing.linear
    }
};

export const useAnimation = (initialConfigs = {}) => {
    // Merge configuraciones personalizadas con las por defecto
    const configs = {
        fadeIn: { ...DEFAULT_CONFIGS.fadeIn, ...initialConfigs.fadeIn },
        fadeOut: { ...DEFAULT_CONFIGS.fadeOut, ...initialConfigs.fadeOut },
        reset: { ...DEFAULT_CONFIGS.reset, ...initialConfigs.reset },
        customMove: { ...DEFAULT_CONFIGS.customMove, ...initialConfigs.customMove }
    };

    // Referencias animadas
    const animateOpacity = useRef(new Animated.Value(0)).current;
    const animatedTop = useRef(new Animated.Value(0)).current;
    const animatedScale = useRef(new Animated.Value(1)).current;
    const animatedRotation = useRef(new Animated.Value(0)).current;

    // Referencias para botones
    const fadeInButtonScale = useRef(new Animated.Value(1)).current;
    const fadeOutButtonScale = useRef(new Animated.Value(1)).current;
    const resetButtonScale = useRef(new Animated.Value(1)).current;

    const [isAnimating, setIsAnimating] = useState(false);

    // Función helper para animar botones
    const animateButton = useCallback((animatedValue, config) => {
        return Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: config.pressValue,
                duration: config.duration,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: config.returnDuration,
                useNativeDriver: true,
            })
        ]);
    }, []);

    const fadeIn = useCallback((customConfig = {}) => {
        if (isAnimating) return Promise.resolve();

        // Merge configuración personalizada
        const config = {
            ...configs.fadeIn,
            ...customConfig,
            opacity: { ...configs.fadeIn.opacity, ...customConfig.opacity },
            scale: { ...configs.fadeIn.scale, ...customConfig.scale },
            rotation: { ...configs.fadeIn.rotation, ...customConfig.rotation },
            translate: { ...configs.fadeIn.translate, ...customConfig.translate },
            button: { ...configs.fadeIn.button, ...customConfig.button }
        };

        setIsAnimating(true);

        return new Promise((resolve) => {
            // Animación del botón
            animateButton(fadeInButtonScale, config.button).start();

            // Animaciones de la caja
            const animations = [];

            if (config.opacity) {
                animations.push(
                    Animated.timing(animateOpacity, {
                        toValue: config.opacity.toValue,
                        duration: config.opacity.duration,
                        useNativeDriver: true,
                        easing: config.opacity.easing
                    })
                );
            }

            if (config.scale) {
                animations.push(
                    Animated.timing(animatedScale, {
                        toValue: config.scale.toValue,
                        duration: config.scale.duration,
                        useNativeDriver: true,
                        easing: config.scale.easing
                    })
                );
            }

            if (config.rotation) {
                animations.push(
                    Animated.timing(animatedRotation, {
                        toValue: config.rotation.toValue,
                        duration: config.rotation.duration,
                        useNativeDriver: true,
                        easing: config.rotation.easing
                    })
                );
            }

            if (config.translate) {
                animations.push(
                    Animated.timing(animatedTop, {
                        toValue: config.translate.toValue,
                        duration: config.translate.duration,
                        useNativeDriver: true,
                        easing: config.translate.easing
                    })
                );
            }

            Animated.parallel(animations).start(({ finished }) => {
                if (finished) {
                    setIsAnimating(false);
                    console.log('FadeIn completed');
                    resolve();
                }
            });
        });
    }, [animatedTop, animateOpacity, animatedScale, animatedRotation, isAnimating, fadeInButtonScale, configs.fadeIn, animateButton]);

    const fadeOut = useCallback((customConfig = {}) => {
        if (isAnimating) return Promise.resolve();

        // Merge configuración personalizada
        const config = {
            ...configs.fadeOut,
            ...customConfig,
            opacity: { ...configs.fadeOut.opacity, ...customConfig.opacity },
            scale: { ...configs.fadeOut.scale, ...customConfig.scale },
            rotation: { ...configs.fadeOut.rotation, ...customConfig.rotation },
            translate: { ...configs.fadeOut.translate, ...customConfig.translate },
            button: { ...configs.fadeOut.button, ...customConfig.button }
        };

        setIsAnimating(true);

        return new Promise((resolve) => {
            // Animación del botón
            animateButton(fadeOutButtonScale, config.button).start();

            // Animaciones de la caja
            const animations = [];

            if (config.opacity) {
                animations.push(
                    Animated.timing(animateOpacity, {
                        toValue: config.opacity.toValue,
                        duration: config.opacity.duration,
                        useNativeDriver: true,
                        easing: config.opacity.easing
                    })
                );
            }

            if (config.scale) {
                animations.push(
                    Animated.timing(animatedScale, {
                        toValue: config.scale.toValue,
                        duration: config.scale.duration,
                        useNativeDriver: true,
                        easing: config.scale.easing
                    })
                );
            }

            if (config.rotation) {
                animations.push(
                    Animated.timing(animatedRotation, {
                        toValue: config.rotation.toValue,
                        duration: config.rotation.duration,
                        useNativeDriver: true,
                        easing: config.rotation.easing
                    })
                );
            }

            if (config.translate) {
                animations.push(
                    Animated.timing(animatedTop, {
                        toValue: config.translate.toValue,
                        duration: config.translate.duration,
                        useNativeDriver: true,
                        easing: config.translate.easing
                    })
                );
            }

            Animated.parallel(animations).start(({ finished }) => {
                if (finished) {
                    setIsAnimating(false);
                    console.log('FadeOut completed');
                    resolve();
                }
            });
        });
    }, [animatedTop, animateOpacity, animatedScale, animatedRotation, isAnimating, fadeOutButtonScale, configs.fadeOut, animateButton]);

    const resetAnimation = useCallback((customConfig = {}) => {
        const config = {
            ...configs.reset,
            ...customConfig,
            button: { ...configs.reset.button, ...customConfig.button }
        };

        // Animación del botón
        animateButton(resetButtonScale, config.button).start();

        // Reset de valores
        animatedTop.setValue(0);
        animateOpacity.setValue(0);
        animatedScale.setValue(1);
        animatedRotation.setValue(0);
        setIsAnimating(false);
    }, [animatedTop, animateOpacity, animatedScale, animatedRotation, resetButtonScale, configs.reset, animateButton]);

    const customAnimation = useCallback((animationConfig) => {
        const {
            property,
            toValue,
            duration = configs.customMove.duration,
            easing = configs.customMove.easing,
            initialValue,
            callback = () => { }
        } = animationConfig;

        const animatedValue = {
            opacity: animateOpacity,
            top: animatedTop,
            scale: animatedScale,
            rotation: animatedRotation
        }[property];

        if (!animatedValue) {
            console.warn(`Property ${property} not found in animated values`);
            return;
        }

        if (initialValue !== undefined) {
            animatedValue.setValue(initialValue);
        }

        return new Promise((resolve) => {
            Animated.timing(animatedValue, {
                toValue: toValue,
                duration: duration,
                useNativeDriver: true,
                easing: easing
            }).start(({ finished }) => {
                if (finished) {
                    callback();
                    resolve();
                }
            });
        });
    }, [animateOpacity, animatedTop, animatedScale, animatedRotation, configs.customMove]);

    // Función para movimiento personalizado (mantener compatibilidad)
    const startMovingTopPosition = useCallback((config) => {
        return customAnimation({
            property: 'top',
            ...config
        });
    }, [customAnimation]);

    // Función para crear animaciones en secuencia
    const sequence = useCallback((animations) => {
        return new Promise((resolve) => {
            const animationPromises = animations.map(animation => {
                if (typeof animation === 'function') {
                    return animation;
                }
                return () => customAnimation(animation);
            });

            const runSequence = async () => {
                for (const animationFn of animationPromises) {
                    await animationFn();
                }
                resolve();
            };

            runSequence();
        });
    }, [customAnimation]);

    // Función para crear animaciones en paralelo
    const parallel = useCallback((animations) => {
        return new Promise((resolve) => {
            const animationPromises = animations.map(animation => {
                if (typeof animation === 'function') {
                    return animation();
                }
                return customAnimation(animation);
            });

            Promise.all(animationPromises).then(() => {
                resolve();
            });
        });
    }, [customAnimation]);

    // Interpolaciones
    const rotation = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const rotationDegrees = (inputRange = [0, 1], outputRange = ['0deg', '360deg']) => {
        return animatedRotation.interpolate({
            inputRange,
            outputRange,
        });
    };

    return {
        // Funciones principales
        fadeIn,
        fadeOut,
        resetAnimation,
        customAnimation,
        startMovingTopPosition, // Mantener para compatibilidad
        sequence,
        parallel,

        // Utilidades
        setIsAnimating,
        rotationDegrees,

        // Valores animados
        rotation,
        animateOpacity,
        animatedTop,
        animatedScale,
        animatedRotation,

        // Escalas de botones
        fadeInButtonScale,
        fadeOutButtonScale,
        resetButtonScale,

        // Estado
        isAnimating,

        // Configuraciones actuales
        configs
    };
};
