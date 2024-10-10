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
      width: '40%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    tableHeadingSmall: {
      width: '15%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
  });

  return (
    <View style={styles.tableContainer}>
      <View style={styles.container}>
        <Text style={styles.tableHeadingSmall}>PLATE NO.</Text>
        <Text style={styles.tableHeadingSmall}>PALLET NO.</Text>
        <Text style={styles.tableHeadingSmall}>BRAND</Text>
        <Text style={styles.tableHeadingSmall}>MODEL</Text>
        <Text style={styles.tableHeadingLarge}>VEHICLE TYPE</Text>
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
      width: '40%',
      textAlign: 'center',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    tableDataSmall: {
      width: '15%',
      textAlign: 'center',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
  });

  const rows = items?.map((item: any) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.tableDataSmall}>{item.plateNo}</Text>
      <Text style={styles.tableDataSmall}>{item.palletNo}</Text>
      <Text style={styles.tableDataSmall}>{item.brand}</Text>
      <Text style={styles.tableDataSmall}>{item.model}</Text>
      <Text style={styles.tableDataLarge}>{item.vehicleTypeName}</Text>
    </View>
  ));

  return <>{rows}</>;
};

export const PDFGeneratorVehicles = ({ tableData, reportFor }: any) => {
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

            {/* <View style={styles.flexRowJustifyBetweenItemsCenter}>
              <View style={styles.flexColDiv}>
                <Text style={styles.headerLeftFont}>Bill To</Text>
                <Text>{tableData.billTo}</Text>
              </View>
              <View style={styles.flexColDiv}>
                <Text style={styles.fontSizeBase}>
                  Invoice Date: {dayjs(tableData.invoiceDate).format('MMM DD, hh:mm A ')}
                </Text>
                <Text style={styles.fontSizeBase}>
                  Due Date: {dayjs(tableData.dueDate).format('MMM DD, hh:mm A ')}
                </Text>
              </View>
            </View> */}

            <View style={styles.horizontalLine} />
            <InvoiceItemsTable invoice={tableData} />

            {/* <View style={styles.flexRowJustifyBetweenItemsCenter}>
              <View style={styles.flexColDiv}>
                <View style={styles.flexColDiv}>
                  <Text style={styles.headerLeftFont}>Notes</Text>
                  <Text>{tableData.notes}</Text>
                </View>
                <View style={styles.flexColDiv}>
                  <Text style={styles.headerLeftFont}>Terms</Text>
                  <Text>{tableData.terms}</Text>
                </View>
              </View>

              <View style={styles.flexColDiv}>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Subtotal:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.subTotalAmount}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Discount:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.discount}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Tax:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.tax}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Total:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.totalAmount}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Paid Amount:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.paidAmount}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Balance Due:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.balanceDue}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Payment Type:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.paymentType}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Bank Name:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.bankName}</Text>
                </View>
                <View style={styles.flexRowJustifyBetweenItemsCenter}>
                  <Text style={styles.fontSizeBase}>Transaction No:</Text>
                  <Text style={styles.fontSizeBase}>{tableData.transactionNo}</Text>
                </View>
              </View>
            </View> */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
