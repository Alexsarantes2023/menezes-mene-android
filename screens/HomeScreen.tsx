import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { MEDIA_IMAGES } from '../assets/media';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const player = useAudioPlayer('https://menezes-mene.netlify.app/musicamenezes.mp3');
  const { playing: isPlaying } = useAudioPlayerStatus(player);

  useEffect(() => {
    player.loop = true;
  }, [player]);

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Oficial com Emblema Sagrado */}
        <View style={styles.header}>
          <Image
            source={MEDIA_IMAGES.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>MINISTERIO WE ARE THE CHURCH</Text>
          <Text style={styles.subtitle}>Menezes Mene</Text>
        </View>

        {/* Card Apresentação José Anchieta Menezes */}
        <View style={styles.heroCard}>
          <Image
            source={MEDIA_IMAGES.homeFeature}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroName}>José Anchieta Menezes</Text>
            <Text style={styles.heroRole}>Guitarrista & Ministro de Louvor</Text>
          </View>
        </View>

        {/* Mini Player Devocional */}
        <View style={styles.playerCard}>
          <View style={styles.playerIconContainer}>
            <MaterialIcons name="music-note" size={26} color="#10b981" />
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.trackTitle}>Música Consagrada</Text>
            <Text style={styles.trackArtist}>Ministério Menezes Mêne</Text>
          </View>
          <TouchableOpacity style={styles.playButton} onPress={togglePlay} activeOpacity={0.8}>
            <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={28} color="#060e20" />
          </TouchableOpacity>
        </View>

        {/* Foto da Irmandade: Grupo Ministério */}
        <View style={styles.groupCard}>
          <Image
            source={MEDIA_IMAGES.homeGroup}
            style={styles.groupImage}
            resizeMode="cover"
          />
          <View style={styles.groupBadge}>
            <MaterialIcons name="groups" size={16} color="#10b981" />
            <Text style={styles.groupBadgeText}>Grupo Ministério Oficial</Text>
          </View>
        </View>

        {/* Seção Acesso Rápido */}
        <Text style={styles.sectionHeader}>Acesso Rápido</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate('Media')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <MaterialIcons name="video-library" size={26} color="#10b981" />
            </View>
            <Text style={styles.gridTitle}>Mídias & Louvor</Text>
            <Text style={styles.gridSub}>Fotos e vídeos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate('Services')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <MaterialIcons name="school" size={26} color="#10b981" />
            </View>
            <Text style={styles.gridTitle}>Cursos & Aulas</Text>
            <Text style={styles.gridSub}>Violão, guitarra e bateria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate('FaqPix')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <MaterialIcons name="qr-code-2" size={26} color="#10b981" />
            </View>
            <Text style={styles.gridTitle}>FAQ & Doação Pix</Text>
            <Text style={styles.gridSub}>Pacotes e contribuição</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate('Contact')}
            activeOpacity={0.8}
          >
            <View style={styles.gridIconCircle}>
              <MaterialIcons name="chat" size={26} color="#10b981" />
            </View>
            <Text style={styles.gridTitle}>Contato & Redes</Text>
            <Text style={styles.gridSub}>Orçamentos via WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Versículo Bíblico Devocional */}
        <View style={styles.verseCard}>
          <Text style={styles.verseQuote}>
            "Cantai-lhe um cântico novo; tocai bem e com júbilo."
          </Text>
          <Text style={styles.verseReference}>— Salmos 33:3</Text>
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
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  title: {
    width: '100%',
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
    marginTop: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#161f36',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 345,
  },
  heroOverlay: {
    padding: 16,
    backgroundColor: 'rgba(6, 14, 32, 0.9)',
  },
  heroName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#ffffff',
  },
  heroRole: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 3,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161f36',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  playerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  trackArtist: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#161f36',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
  },
  groupImage: {
    width: '100%',
    height: 180,
  },
  groupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(6, 14, 32, 0.9)',
    gap: 8,
  },
  groupBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    width: (width - 44) / 2,
    backgroundColor: '#161f36',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
  },
  gridIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  gridSub: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 3,
  },
  verseCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    padding: 16,
  },
  verseQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#e2e8f0',
    lineHeight: 22,
  },
  verseReference: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10b981',
    textAlign: 'right',
    marginTop: 8,
  },
});