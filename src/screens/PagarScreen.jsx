import React, { useState, useEffect } from 'react';
import { Surface, Text, Button, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth'; 
import app from "../config/firebase"; 

const auth = getAuth(app); 

export default function PaymentScreen({ navigation }) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem('balance');
        if (storedBalance !== null) {
          setBalance(parseFloat(storedBalance));
        } else {
          setBalance(1356.00); 
        }
      } catch (error) {
        console.error('Erro ao carregar o saldo:', error);
      }
    };

    loadBalance();
  }, []);


  const handlePayment = async () => {
    const amountValue = parseFloat(paymentAmount);
    if (!isNaN(amountValue) && amountValue > 0 && amountValue <= balance && paymentDescription) {
      try {
        const newBalance = balance - amountValue;
        await AsyncStorage.setItem('balance', newBalance.toFixed(2));
        setBalance(newBalance);
        setTransactionStatus('Pagamento realizado com sucesso!');
        setPaymentAmount('');
        setPaymentDescription('');
      } catch (error) {
        setTransactionStatus('Erro ao atualizar o saldo.');
        console.error('Erro ao salvar o saldo:', error);
      }
    } else {
      setTransactionStatus('Erro: Verifique os dados inseridos ou saldo insuficiente.');
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Realizar Pagamento</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Descrição do Pagamento"
          mode="outlined"
          value={paymentDescription}
          onChangeText={setPaymentDescription}
          style={styles.input}
        />
        <TextInput
          label="Valor"
          mode="outlined"
          keyboardType="numeric"
          value={paymentAmount}
          onChangeText={setPaymentAmount}
          style={styles.input}
        />
        <Button mode="contained" onPress={handlePayment} style={styles.button}>
          Pagar
        </Button>
        {transactionStatus && (
          <Text style={styles.status}>{transactionStatus}</Text>
        )}
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Atual:</Text>
        <Text style={styles.balanceAmount}>R$ {balance.toFixed(2)}</Text>
      </View>
      <View style={styles.bottomActions}>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.backButton}>
          Voltar
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#a547bf',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#a547bf', 
  },
  status: {
    marginVertical: 10,
    color: '#a547bf', 
    textAlign: 'center',
  },
  balanceContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#333',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a547bf', 
  },
  bottomActions: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#a547bf', 
  },
});
