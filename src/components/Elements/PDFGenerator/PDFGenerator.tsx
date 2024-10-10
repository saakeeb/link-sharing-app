import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';

const InvoiceData = {
  items: [
    {
      sno: 1,
      plateNo: '4645h',
      palletNo: '6435er456',
      vehicleType: 'Small Car',
      isBlocked: true,
      isActive: false,
    },
    {
      sno: 2,
      plateNo: '4645h',
      palletNo: '6435er456',
      vehicleType: 'Small Car',
      isBlocked: true,
      isActive: false,
    },
    {
      sno: 3,
      plateNo: '4645h',
      palletNo: '6435er456',
      vehicleType: 'Small Car',
      isBlocked: true,
      isActive: false,
    },
    {
      sno: 4,
      plateNo: '4645h',
      palletNo: '6435er456',
      vehicleType: 'Small Car',
      isBlocked: true,
      isActive: false,
    },
    {
      sno: 5,
      plateNo: '4645h',
      palletNo: '6435er456',
      vehicleType: 'Small Car',
      isBlocked: true,
      isActive: false,
    },
  ],
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
    plateNo: {
      width: '20%',
      textAlign: 'center',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    palletNo: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: 'center',
      paddingRight: 8,
    },
    vehicleType: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: 'center',
      paddingRight: 8,
    },
    isBlocked: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: 'center',
      paddingRight: 8,
    },
    isActive: {
      width: '20%',
      textAlign: 'center',
      paddingRight: 8,
    },
  });

  const rows = items.map((item: any) => (
    <View style={styles.row} key={item.sno.toString()}>
      <Text style={styles.plateNo}>{item.plateNo}</Text>
      <Text style={styles.palletNo}>{item.palletNo}</Text>
      <Text style={styles.vehicleType}>{item.vehicleType}</Text>
      <Text style={styles.isBlocked}>{item.isBlocked.toString()}</Text>
      <Text style={styles.isActive}>{item.isActive.toString()}</Text>
    </View>
  ));

  return <>{rows}</>;
};

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
    plateNo: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    palletNo: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    vehicleType: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    isBlocked: {
      width: '20%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    isActive: {
      width: '20%',
    },
  });

  return (
    <View style={styles.tableContainer}>
      <View style={styles.container}>
        <Text style={styles.plateNo}>Plate No</Text>
        <Text style={styles.palletNo}>Pallet No</Text>
        <Text style={styles.vehicleType}>Vehicle Type</Text>
        <Text style={styles.isBlocked}>Is Blocked</Text>
        <Text style={styles.isActive}>Is Active</Text>
      </View>
      <InvoiceTableRow items={invoice.items} />
    </View>
  );
};

export const PDFGenerator = () => {
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
    headerRightFont: {
      fontSize: 15,
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
  });

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <View style={styles.mainHeader}>
              <Text style={styles.headerLeftFont}>Car Reports</Text>
              <View style={styles.headerDetails}>
                <Image
                  style={styles.logo}
                  src="https://th.bing.com/th/id/OIP.LDH3y4lFbVqS_U_-FlmVyAHaHa?rs=1&pid=ImgDetMain"
                />
                <View style={styles.companyDetails}>
                  <Text style={styles.headerRightFont}>Parkolay</Text>
                  <Text style={styles.headerRightAddress}>Atatürk Caddesi</Text>
                </View>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <InvoiceItemsTable invoice={InvoiceData} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
