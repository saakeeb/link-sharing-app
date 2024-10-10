import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

import { useCompany } from '@/features/company/company/api/getCompanies';
import { useUserStore } from '@/stores/userStore';

const InvoiceItemsTable = ({ invoice }: any) => {
  const borderColor = '#777';
  const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: 'column',
      marginTop: 24,
      borderWidth: 1,
      borderColor: '#777',
    },
    container: {
      flexDirection: 'row',
      borderBottomColor: '#777',
      backgroundColor: '#777',
      color: '#fff',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 24,
      textAlign: 'center',
      fontStyle: 'bold',
    },
    tableHeadingLarge: {
      width: '25%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    tableHeadingSmall: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
  });

  return (
    <View style={styles.tableContainer}>
      <View style={styles.container}>
        <Text style={styles.tableHeadingSmall}>NAME</Text>
        <Text style={styles.tableHeadingSmall}>MOBILE NO.</Text>
        <Text style={styles.tableHeadingSmall}>PLATE NO.</Text>
        <Text style={styles.tableHeadingSmall}>MODEL</Text>
        <Text style={styles.tableHeadingSmall}>ADDRESS</Text>
      </View>
      <InvoiceTableRow items={invoice} />
    </View>
  );
};

const InvoiceTableRow = ({ items }: any) => {
  const borderColor = '#777';
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      borderBottomColor: '#777',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 24,
      fontStyle: 'bold',
    },
    tableDataLarge: {
      width: '25%',
      textAlign: 'center',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    tableDataSmall: {
      width: '20%',
      textAlign: 'center',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
  });

  const rows = items?.map((item: any) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.tableDataSmall}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.tableDataSmall}>{item.mobileNo}</Text>
      <Text style={styles.tableDataSmall}>{item.plateNo}</Text>
      <Text style={styles.tableDataSmall}>{item.model}</Text>
      <Text style={styles.tableDataSmall}>{item.address}</Text>
    </View>
  ));

  return <>{rows}</>;
};

export const PDFGeneratorCustomers = ({ tableData, reportFor }: any) => {
  const { data: companyData } = useCompany();
  const profile = useUserStore((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState<any>('');

  // This is for pdf style
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 50,
      paddingRight: 50,
      lineHeight: 1.5,
      flexDirection: 'column',
    },
    mainHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeftFont: {
      fontSize: 20,
    },
    fontSizeBase: {
      fontSize: 16,
    },
    headerRightAddress: {
      fontSize: 12,
    },
    logo: {
      width: 60,
      height: 50,
    },
    headerDetails: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    companyDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 10,
    },
    horizontalLine: { borderTop: 1, borderColor: '#777', marginTop: 20 },
    section: {
      margin: 15,
      padding: 20,
      flexGrow: 1,
    },

    flexRowJustifyBetweenItemsCenter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '10px',
    },
    flexColDiv: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '10px',
    },
  });

  useEffect(() => {
    if (profile && profile.company && companyData && companyData.length > 0) {
      const findCurrentCompany = companyData?.find(
        (company: any) => company.id === profile.company
      );

      setCurrentCompany(findCurrentCompany);
    }
  }, [companyData, profile]);

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <View style={styles.mainHeader}>
              <Text style={styles.headerLeftFont}>{reportFor} Reports</Text>
              <View style={styles.headerDetails}>
                {currentCompany?.logo && <Image style={styles.logo} src={currentCompany?.logo} />}
                <View style={styles.companyDetails}>
                  <Text style={styles.fontSizeBase}>Parkolay</Text>
                  <Text style={styles.headerRightAddress}>Atatürk Caddesi</Text>
                </View>
              </View>
            </View>

            <View style={styles.horizontalLine} />
            <InvoiceItemsTable invoice={tableData} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
