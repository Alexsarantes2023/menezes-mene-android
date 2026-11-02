import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { MEDIA_IMAGES } from '../assets/media';

const PACKAGES = [
  {
    id: 'p1',
    title: '1º Apresentação Solo',
    description: 'Performance individual para eventos exclusivos, proporcionando um ambiente intimista e sofisticado.',
    highlight: 'Ideal para jantares, cultos e cerimônias.',
  },
  {
    id: 'p2',
    title: '2º Pacote Light',
    description: 'Ideal para apresentações acústicas ou eventos mais reservados, com um toque especial de música ao vivo.',
    highlight: 'Voz, violão/guitarra e percussão leve.',
  },
  {
    id: 'p3',
    title: '3º Pacote Mais Popular',
    description: 'Perfeito para shows ao vivo, eventos corporativos ou festas privadas, trazendo energia contagiante e repertório variado.',
    highlight: 'Banda completa com alta presença de palco.',
  },
  {
    id: 'p4',
    title: '4º Pacote Empresarial',
    description: 'Produção completa, incluindo sonorização profissional, iluminação personalizada e setlist exclusivo para grandes eventos.',
    highlight: 'Estrutura técnica e repertório personalizado.',
  },
];

const PIX_PHONE = '(13) 98135-4808';
const PIX_NAME = 'José Anchieta Menezes';
const PIX_COPY_PASTE = '00020126360014BR.GOV.BCB.PIX0114+55139813548085204000053039865802BR5921Jose Anchieta Menezes6011Santos -';

export default function FaqPixScreen() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('p1');

  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copiado com sucesso!', `${label} copiado para a área de transferência.`);
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
          <Text style={styles.title}>FAQ & Pagamento Pix</Text>
          <Text style={styles.subtitle}>Dúvidas Frequentes, Pacotes e Contribuições</Text>
        </View>

        {/* Card Destaque PIX Oficial */}
        <View style={styles.pixCard}>
          <View style={styles.pixBadge}>
            <MaterialIcons name="bolt" size={16} color="#10b981" />
            <Text style={styles.pixBadgeText}>Pagamento & Doação Instantânea</Text>
          </View>

          <Text style={styles.pixTitle}>Chave PIX Oficial</Text>
          <Text style={styles.pixSubtitle}>Titular: {PIX_NAME}</Text>

          <View style={styles.pixKeyBox}>
            <View>
              <Text style={styles.pixKeyLabel}>Chave Telefone:</Text>
              <Text style={styles.pixKeyValue}>{PIX_PHONE}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyMiniBtn}
              onPress={() => copyToClipboard(PIX_PHONE, 'Chave PIX')}
            >
              <MaterialIcons name="content-copy" size={20} color="#10b981" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.pixCta}
            onPress={() => copyToClipboard(PIX_COPY_PASTE, 'Código Copia e Cola')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="qr-code-2" size={20} color="#060e20" />
            <Text style={styles.pixCtaText}>Copiar Código PIX (Copia e Cola)</Text>
          </TouchableOpacity>
        </View>

        {/* Acordeão de Pacotes de Apresentação */}
        <Text style={styles.sectionTitle}>Pacotes de Shows & Apresentações</Text>
        {PACKAGES.map((pkg) => {
          const isOpen = openAccordion === pkg.id;
          return (
            <View key={pkg.id} style={styles.accordionCard}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => setOpenAccordion(isOpen ? null : pkg.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.accordionTitle}>{pkg.title}</Text>
                <MaterialIcons
                  name={isOpen ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#10b981"
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.accordionBody}>
                  <Text style={styles.accordionDesc}>{pkg.description}</Text>
                  <View style={styles.highlightBox}>
                    <MaterialIcons name="verified" size={16} color="#10b981" />
                    <Text style={styles.highlightText}>{pkg.highlight}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        {/* Métodos de Pagamento */}
        <View style={styles.methodsCard}>
          <Text style={styles.methodsTitle}>Métodos Aceitos</Text>
          <View style={styles.methodsRow}>
            <View style={styles.methodPill}>
              <MaterialIcons name="bolt" size={16} color="#10b981" />
              <Text style={styles.methodText}>PIX 24/7</Text>
            </View>
            <View style={styles.methodPill}>
              <MaterialIcons name="credit-card" size={16} color="#38bdf8" />
              <Text style={styles.methodText}>Cartão até 12x</Text>
            </View>
            <View style={styles.methodPill}>
              <MaterialIcons name="currency-bitcoin" size={16} color="#f59e0b" />
              <Text style={styles.methodText}>Bitcoin</Text>
            </View>
          </View>
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
  pixCard: {
    backgroundColor: '#161f36',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    marginBottom: 24,
  },
  pixBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  pixBadgeText: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pixTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  pixSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
    marginBottom: 14,
  },
  pixKeyBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0b1326',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 14,
  },
  pixKeyLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  pixKeyValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 2,
  },
  copyMiniBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  pixCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  pixCtaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#060e20',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  accordionCard: {
    backgroundColor: '#161f36',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 10,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  accordionBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  accordionDesc: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 19,
    marginBottom: 10,
  },
  highlightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  highlightText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  methodsCard: {
    backgroundColor: '#161f36',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 10,
  },
  methodsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  methodPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b1326',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  methodText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
});
