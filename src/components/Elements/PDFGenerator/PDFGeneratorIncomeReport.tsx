import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

import { useCompany } from '@/features/company/company/api/getCompanies';
import { Description } from '@/features/reports/daily-income';
import { useUserStore } from '@/stores/userStore';

const IncomeReportTableRow = ({ items }: any) => {
  const borderColor = '#777';
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      borderBottomColor: '#777',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: '100%',
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
      width: '12%',
      textAlign: 'center',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    tableDataSmallForLast: {
      width: '12%',
      textAlign: 'center',
      paddingLeft: 8,
    },
    flexColDiv: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '2px',
      marginTop: '6px',
      paddingBottom: '2px',
      marginBottom: '6px',
      height: '100',
    },
    py1: {
      paddingTop: '4px',
      paddingBottom: '4px',
    },
  });

  const rows = items?.map((item: any) => (
    <View style={{ height: '100px' }} key={item.id}>
      <View style={styles.row}>
        <Text style={styles.tableDataSmall}>{item.shift}</Text>
        <Text style={styles.tableDataSmall}>{item.shiftName}</Text>
        <Text style={styles.tableDataSmall}>{item.ticketNo}</Text>
        <Text style={styles.tableDataSmall}>#INV{item.invoiceNo}</Text>
        <View style={styles.tableDataLarge}>
          <View style={styles.flexColDiv}>
            {item.description &&
              item.description.map((itemDesc: Description, descIndex: number) => (
                <Text key={descIndex}>
                  {itemDesc.item_name && itemDesc.item_name}{' '}
                  {(itemDesc.quantity || itemDesc.unit) && <Text>,</Text>}
                  {itemDesc.quantity && (
                    <Text>
                      {itemDesc.quantity}(Q)
                      {itemDesc.unit && <Text>,</Text>}
                    </Text>
                  )}
                  {itemDesc.unit && <Text>{itemDesc.unit && itemDesc.unit}(U)</Text>}
                </Text>
              ))}
          </View>
        </View>
        <Text style={styles.tableDataSmallForLast}>{item.paidAmount}</Text>
      </View>
    </View>
  ));

  return <>{rows}</>;
};

const IncomeReportItemsTable = ({ IncomeReport }: any) => {
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
      backgroundColor: '#F5B82F',
      color: '#black',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: '50',
      minHeight: '50px',
      maxHeight: '50px',
      textAlign: 'center',
      fontStyle: 'bold',
    },
    tableHeadingLarge: {
      width: '40%',
      borderRightColor: borderColor,
      // borderRightWidth: 1,
    },
    tableHeadingSmall: {
      width: '12%',
      borderRightColor: borderColor,
      // borderRightWidth: 1,
    },
  });

  return (
    <View style={styles.tableContainer}>
      <View style={styles.container}>
        <Text style={styles.tableHeadingSmall}>Shift</Text>
        <Text style={styles.tableHeadingSmall}>Shift name</Text>
        <Text style={styles.tableHeadingSmall}>Ticket No.</Text>
        <Text style={styles.tableHeadingSmall}>Invoice No.</Text>
        <Text style={styles.tableHeadingLarge}>Description</Text>
        <Text style={styles.tableHeadingSmall}>AMOUNT</Text>
      </View>
      <IncomeReportTableRow items={IncomeReport} />
    </View>
  );
};

export const PDFGeneratorIncomeReport = ({ tableData, reportFor }: any) => {
  const { data: companyData } = useCompany();
  const profile = useUserStore((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState<any>('');

  // This is for pdf style
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 0,
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 50,
      lineHeight: 1.5,
      flexDirection: 'column',
    },
    mainHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '20px',
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
        <Page size="A4">
          <View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: 50,
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                minHeight: '90px',
                maxHeight: '90px',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '4px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottom: '1px solid black',
                }}
              >
                {currentCompany?.logo && <Image style={styles.logo} src={currentCompany?.logo} />}
                <View style={styles.flexColDiv}>
                  <Text>{currentCompany?.name}</Text>
                  <Text
                    style={{
                      fontSize: '12px',
                      width: '100px',
                      paddingTop: '5px',
                      paddingBottom: '5px',
                    }}
                  >
                    {currentCompany?.address}
                  </Text>
                </View>
              </View>
              <Image
                style={{
                  width: '50%',
                  height: '95px',
                }}
                src={'https://i.ibb.co/L9gRX2P/image.png'}
              />
              <Text
                style={{
                  width: '170px',
                  position: 'absolute',
                  color: 'white',
                  fontSize: '40px',
                  top: '20px',
                  right: '10px',
                  fontWeight: 'bold',
                }}
              >
                INVOICE
              </Text>
            </View>

            <View style={styles.page}>
              <View style={styles.mainHeader}>
                <Text style={styles.headerLeftFont}>{reportFor} Reports</Text>
              </View>

              <View style={styles.flexRowJustifyBetweenItemsCenter}></View>

              <View style={styles.horizontalLine} />
              <IncomeReportItemsTable IncomeReport={tableData} />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
