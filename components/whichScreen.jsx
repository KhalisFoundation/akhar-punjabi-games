import { useRoute } from '@react-navigation/native';
export const screenName = () => {
    const route = useRoute();
    return route.name;
}