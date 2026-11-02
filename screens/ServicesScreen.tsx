import React, { useState } from 'react';
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

interface ServiceItem {
  id: string;
  category: 'instruments' | 'presentations' | 'languages';
  title: string;
  description: string;
  rating: number;
  badge?: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    category: 'instruments',
    title: 'Aulas de Guitarra e Violão',
    description: 'Aprenda a tocar guitarra e violão com aulas personalizadas para todos os níveis. Desenvolva habilidades técnicas e teóricas, explore diversos estilos e toque suas músicas favoritas!',
    rating: 5,
    icon: 'music-note',
  },
  {
    id: 's2',
    category: 'instruments',
    title: 'Aulas de Bateria',
    description: 'Aprenda bateria do zero ao avançado com aulas práticas e dinâmicas! Teoria, rudimentos, grooves e viradas adaptados para acelerar seu aprendizado de forma prática.',
    rating: 5,
    icon: 'straighten',
  },
  {
    id: 's3',
    category: 'languages',
    title: 'Aulas de Inglês (Projeto Futuro)',
    description: 'Aprenda inglês de forma dinâmica e interativa com o Projeto Futuro! Comunicação, leitura e conversação para expandir seus horizontes.',
    rating: 5,
    badge: 'Projeto Futuro',
    icon: 'language',
  },
  {
    id: 's4',
    category: 'presentations',
    title: 'Apresentações Solo ou em Grupo',
    description: 'Apresentações musicais com excelência para cultos, conferências, eventos e confraternizações. Experiência ao vivo inesquecível com presença de palco marcante.',
    rating: 5,
    icon: 'groups',
  },
];

export default function ServicesScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'instruments' | 'presentations' | 'languages'>('all');

  const filtered = selectedFilter === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedFilter);

  const openWhatsApp = (serviceTitle: string) => {
    const text = encodeURIComponent(`Olá, gostaria de solicitar orçamento para: ${serviceTitle}!`);
    Linking.openURL(`https://wa.me/13981354808?text=${text}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={MEDIA_IMAGES.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Cursos & Ministrações</Text>
          <Text style={styles.subtitle}>Aulas Práticas e Apresentações Musicais</Text>
        </View>

        {/* Filtros em Abas Contidas */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedFilter === 'instruments' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('instruments')}
          >
            <Text style={[styles.filterText, selectedFilter === 'instruments' && styles.filterTextActive]}>Instrumentos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedFilter === 'presentations' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('presentations')}
          >
            <Text style={[styles.filterText, selectedFilter === 'presentations' && styles.filterTextActive]}>Apresentações</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedFilter === 'languages' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('languages')}
          >
            <Text style={[styles.filterText, selectedFilter === 'languages' && styles.filterTextActive]}>Idiomas</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Lista de Serviços */}
        {filtered.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <MaterialIcons name={item.icon} size={24} color="#10b981" />
              </View>
              <View style={styles.cardTitleBox}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
            </View>

            <Text style={styles.cardDesc}>{item.description}</Text>

            <View style={styles.starsRow}>
              {[...Array(item.rating)].map((_, i) => (
                <MaterialIcons key={i} name="star" size={18} color="#eab308" />
              ))}
              <Text style={styles.ratingText}>5.0 (Excelente)</Text>
            </View>

            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => openWhatsApp(item.title)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="chat" size={18} color="#060e20" />
              <Text style={styles.ctaText}>Solicitar Orçamento no WhatsApp</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 16,
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
  filterScroll: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#161f36',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
  },
  filterText: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#10b981',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#161f36',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitleBox: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  badgeText: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#eab308',
    fontWeight: '600',
    marginLeft: 6,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#060e20',
  },
});
