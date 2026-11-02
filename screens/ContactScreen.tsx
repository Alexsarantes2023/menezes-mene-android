import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { MEDIA_IMAGES } from '../assets/media';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Apresentação Musical');
  const [message, setMessage] = useState('');

  const sendWhatsApp = () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Por favor, informe seu nome.');
      return;
    }

    const text = encodeURIComponent(
      `*Contato Ministério Menezes Mêne*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📱 *Telefone:* ${phone || 'Não informado'}\n` +
      `🎸 *Tipo de Evento:* ${eventType}\n` +
      `💬 *Mensagem:* ${message || 'Solicitação de orçamento direto.'}`
    );

    Linking.openURL(`https://wa.me/13981354808?text=${text}`);
  };

  const makeCall = () => {
    Linking.openURL('tel:+5513981354808');
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
          <Text style={styles.title}>Contato & Orçamento</Text>
          <Text style={styles.subtitle}>Fale Diretamente com o Ministério</Text>
        </View>

        {/* Card Formulário */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Enviar Mensagem</Text>

          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>WhatsApp / Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: (13) 99999-9999"
            placeholderTextColor="#64748b"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Tipo de Evento ou Aula</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Culto, Casamento, Aula de Guitarra..."
            placeholderTextColor="#64748b"
            value={eventType}
            onChangeText={setEventType}
          />

          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva detalhes, data desejada e localização..."
            placeholderTextColor="#64748b"
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={sendWhatsApp} activeOpacity={0.8}>
            <MaterialIcons name="chat" size={20} color="#060e20" />
            <Text style={styles.submitBtnText}>Enviar via WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Contato Telefônico Direto */}
        <View style={styles.quickContactCard}>
          <Text style={styles.quickTitle}>Atendimento Telefônico</Text>
          <Text style={styles.quickPhone}>+55 (13) 98135-4808</Text>
          <TouchableOpacity style={styles.callBtn} onPress={makeCall} activeOpacity={0.8}>
            <MaterialIcons name="call" size={18} color="#10b981" />
            <Text style={styles.callBtnText}>Ligar Agora</Text>
          </TouchableOpacity>
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
  formCard: {
    backgroundColor: '#161f36',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0b1326',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 14,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 4,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#060e20',
  },
  quickContactCard: {
    backgroundColor: '#161f36',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  quickTitle: {
    fontSize: 13,
    color: '#94a3b8',
  },
  quickPhone: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginVertical: 6,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  callBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10b981',
  },
});
