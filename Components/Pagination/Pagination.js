import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../Styles/Colors';

// icons
import LeftIcon from './left.svg';
import RightIcon from './right.svg';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Limit the number of visible pages to avoid overflow
  const visiblePages = 5; // Adjust this number based on your needs
  const halfVisiblePages = Math.floor(visiblePages / 2);

  // Determine the range of pages to display
  let startPage = Math.max(1, currentPage - halfVisiblePages);
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(startPage - 1, endPage);

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.pageButton}
      >
        <LeftIcon width={16} height={16} />
      </TouchableOpacity>

      {pageNumbers.map((pageNumber) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={pageNumber}
          onPress={() => onPageChange(pageNumber)}
          style={[styles.pageButton, currentPage === pageNumber && styles.activePageButton]}
        >
          <Text style={[styles.pageText, currentPage === pageNumber && styles.activePageText]}>
            {pageNumber}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.pageButton}
      >
        <RightIcon width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    justifyContent: "center"
  },
  pageButton: {
    height: 32,
    width: 32,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: Colors.Grayscale200,
    justifyContent: "center",
    alignItems: "center"
  },
  activePageButton: {
    backgroundColor: Colors.PrimaryYellow,
  },
  pageText: {
    fontSize: 16,
    color: Colors.Grayscale500,
  },
  activePageText: {
    color: 'white',
  },
});

export default Pagination;
