import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { MEDIA_IMAGES } from '../assets/media';

interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    name: 'Instagram Oficial',
    handle: '@menezes_mene',
    url: 'https://www.instagram.com/menezes_mene/profilecard/?igsh=MTZ3dXF6NnBwNm85dw==',
    icon: 'camera-alt',
    color: '#e1306c',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'MenezesSP',
    url: 'https://www.facebook.com/MenezesSP?mibextid=ZbWKwL',
    icon: 'public',
    color: '#1877f2',
  },
  {
    id: 'youtube',
    name: 'YouTube Louvores',
    handle: '@menezesmene5489',
    url: 'https://youtube.com/@menezesmene5489?si=I5zUZhuSavOFciCp',
    icon: 'play-circle-fill',
    color: '#ff0000',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Direto',
    handle: '(13) 98135-4808',
    url: 'https://wa.me/13981354808?text=Quero%20contratar!',
    icon: 'chat',
    color: '#25d366',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Menezes Mêne',
    url: 'https://br.linkedin.com',
    icon: 'work',
    color: '#0a66c2',
  },
];

export default function SocialScreen() {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={MEDIA_IMAGES.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Redes Sociais Oficiais</Text>
          <Text style={styles.subtitle}>Conecte-se com o Ministério Menezes Mêne</Text>
        </View>

        {/* Lista de Redes Sociais */}
        {SOCIAL_LINKS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.socialCard}
            onPress={() => openUrl(item.url)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBox, { backgroundColor: `${item.color}20` }]}>
              <MaterialIcons name={item.icon} size={26} color={item.color} />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.socialName}>{item.name}</Text>
              <Text style={styles.socialHandle}>{item.handle}</Text>
            </View>
            <MaterialIcons name="open-in-new" size={20} color="#94a3b8" />
          </TouchableOpacity>
        ))}

        {/* Rodapé de Direitos e Créditos */}
        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            © 2025 Ministério Menezes Mêne - We Are The Church
          </Text>
          <Text style={styles.footerSubText}>
            Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1326',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 110,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 52,
    height: 52,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 2,
  },
  socialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161f36',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 12,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoBox: {
    flex: 1,
  },
  socialName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  socialHandle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  footerBox: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  footerSubText: {
    fontSize: 11,
    color: '#475569',
    marginTop: 4,
  },
});
