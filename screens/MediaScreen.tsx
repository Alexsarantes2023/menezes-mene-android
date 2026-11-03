import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MEDIA_IMAGES } from '../assets/media';

const { width } = Dimensions.get('window');
const VIDEO_ASPECT_RATIO = 406 / 720;

const BAND_VIDEOS = [
  {
    id: 'v1',
    title: 'Vídeo Oficial 1 - Ministério Louvor',
    uri: 'https://menezes-mene.netlify.app/midia/meuvideo.mp4',
    poster: MEDIA_IMAGES.videoPosters[0],
  },
  {
    id: 'v2',
    title: 'Vídeo Oficial 2 - Solo de Guitarra',
    uri: 'https://menezes-mene.netlify.app/midia/meuvideo2.mp4',
    poster: MEDIA_IMAGES.videoPosters[1],
  },
  {
    id: 'v3',
    title: 'Vídeo Oficial 3 - Congresso We Are The Church',
    uri: 'https://menezes-mene.netlify.app/midia/meuvideo3.mp4',
    poster: MEDIA_IMAGES.videoPosters[2],
  },
];

function BandVideoCard({ video }: { video: (typeof BAND_VIDEOS)[number] }) {
  const player = useVideoPlayer(null);
  const { status, error } = useEvent(player, 'statusChange', { status: player.status });
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const startPlayback = async () => {
    setIsLoading(true);
    setPlaybackError(null);

    try {
      await player.replaceAsync(video.uri);
      setIsStarted(true);
      player.play();
    } catch (cause) {
      setPlaybackError(
        cause instanceof Error ? cause.message : 'Não foi possível carregar este vídeo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.videoCard}>
      {isStarted ? (
        <VideoView
          style={styles.videoThumb}
          player={player}
          nativeControls
          contentFit="cover"
        />
      ) : (
        <TouchableOpacity
          style={styles.videoPreview}
          onPress={startPlayback}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Image source={video.poster} style={styles.videoPoster} resizeMode="contain" />
          <View style={styles.videoOverlay}>
            <MaterialIcons
              name={isLoading ? 'hourglass-top' : 'play-arrow'}
              size={32}
              color="#060e20"
            />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{video.title}</Text>
        {(playbackError || (status === 'error' && error?.message)) && (
          <Text style={styles.videoError}>
            {playbackError ?? error?.message ?? 'Não foi possível reproduzir este vídeo.'}
          </Text>
        )}
      </View>
    </View>
  );
}

export default function MediaScreen() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const carouselRef = useRef<FlatList>(null);

  // Autoplay de fotos a cada 3 segundos
  useEffect(() => {
    if (!autoplayActive) return;
    const interval = setInterval(() => {
      const nextIndex = (photoIndex + 1) % MEDIA_IMAGES.gallery.length;
      setPhotoIndex(nextIndex);
      carouselRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [photoIndex, autoplayActive]);

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
          <Text style={styles.title}>Mídias & Louvor</Text>
          <Text style={styles.subtitle}>Galeria, Vídeos e Gravações Oficiais</Text>
        </View>

        {/* Carrossel de Fotos com Botoeira */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Álbum de Fotos ({photoIndex + 1}/{MEDIA_IMAGES.gallery.length})</Text>
          <TouchableOpacity
            style={styles.autoplayBadge}
            onPress={() => setAutoplayActive(!autoplayActive)}
          >
            <MaterialIcons name={autoplayActive ? 'pause' : 'play-arrow'} size={16} color="#10b981" />
            <Text style={styles.autoplayText}>{autoplayActive ? 'Auto (3s)' : 'Pausado'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.carouselContainer}>
          <FlatList
            ref={carouselRef}
            data={MEDIA_IMAGES.gallery}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
              setPhotoIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image source={item.source} style={styles.slideImage} resizeMode="contain" />
                <View style={styles.slideCaption}>
                  <Text style={styles.slideTitle}>{item.title}</Text>
                  <Text style={styles.slideDesc}>{item.description}</Text>
                </View>
              </View>
            )}
          />

          {/* Botoeira com Controles Anterior / Próximo */}
          <View style={styles.carouselControls}>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => {
                const prev = photoIndex > 0 ? photoIndex - 1 : MEDIA_IMAGES.gallery.length - 1;
                setPhotoIndex(prev);
                carouselRef.current?.scrollToIndex({ index: prev, animated: true });
              }}
            >
              <MaterialIcons name="chevron-left" size={24} color="#ffffff" />
            </TouchableOpacity>

            <View style={styles.indicatorContainer}>
              {MEDIA_IMAGES.gallery.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, photoIndex === idx && styles.activeDot]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => {
                const next = (photoIndex + 1) % MEDIA_IMAGES.gallery.length;
                setPhotoIndex(next);
                carouselRef.current?.scrollToIndex({ index: next, animated: true });
              }}
            >
              <MaterialIcons name="chevron-right" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Vídeos da Banda */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Vídeos da Banda</Text>
        {BAND_VIDEOS.map((video) => (
          <BandVideoCard key={video.id} video={video} />
        ))}
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
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  autoplayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  autoplayText: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '600',
  },
  carouselContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#161f36',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  slide: {
    width: width - 32,
    height: 345,
  },
  slideImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#0b1326',
  },
  slideCaption: {
    padding: 12,
    backgroundColor: '#161f36',
  },
  slideTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  slideDesc: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  carouselControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  controlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeDot: {
    width: 16,
    backgroundColor: '#10b981',
  },
  videoCard: {
    marginHorizontal: -8,
    backgroundColor: '#161f36',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  videoThumb: {
    width: '100%',
    aspectRatio: VIDEO_ASPECT_RATIO,
    backgroundColor: '#0b1326',
  },
  videoPoster: {
    width: '100%',
    height: 300,
    backgroundColor: '#0b1326',
  },
  videoPreview: {
    position: 'relative',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  videoInfo: {
    padding: 14,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  videoError: {
    fontSize: 12,
    color: '#f87171',
    marginTop: 6,
  },
});
