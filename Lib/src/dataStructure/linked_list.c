#include "linked_list.h"
#include <logger.h>
#include <stdio.h>
#include <stdlib.h>
/**
 *
 **/
 t_linkedListElement * linkedListElementCreate(void * a_data) {
 	t_linkedListElement * l_newListElement = (t_linkedListElement *)malloc(sizeof(t_linkedListElement));
	if ( l_newListElement == NULL ) {
		LOG_ERROR("Failed creating new linked list element.");
	} else {
		l_newListElement->m_next = NULL;
		l_newListElement->m_prev = NULL;
		l_newListElement->m_data = a_data;
	}
	
	return l_newListElement;
}

/**
 *
 **/
void linkedListPrepend(t_linkedList * a_list, void * a_data) {
	t_linkedListElement * l_newListElement = linkedListElementCreate(a_data);
	if ( l_newListElement != NULL ) {
		if( a_list->m_head == NULL ) {
			a_list->m_head = l_newListElement;
			a_list->m_tail = l_newListElement;
		} else {
			a_list->m_head->m_prev = l_newListElement;
			l_newListElement->m_next = a_list->m_head;
			a_list->m_head = l_newListElement;
		}
	} else {
		LOG_ERROR("Fail allocating new list element.");
	}
}

/**
 *
 **/
void linkedListPush(t_linkedList * a_list, void * a_data) {
	t_linkedListElement * l_newListElement = linkedListElementCreate(a_data);
	
	if ( l_newListElement != NULL ) {
		if ( a_list != NULL ) {
			if ( a_list->m_tail != NULL ) {
				// link new element to the tail of the list
				a_list->m_tail->m_next = l_newListElement;
				l_newListElement->m_prev = a_list->m_tail;
				
				// set new element as the tail of the list
				a_list->m_tail = l_newListElement;
			} else {
				// list is empty, new element is the head and tail of the list
				a_list->m_tail = l_newListElement;
				a_list->m_head = l_newListElement;
			}
		}
	} else {
		// List is not defined
		LOG_ERROR("Fail allocating memory for new linked list element");
	}
}

/**
 *
 **/
void * linkedListPop(t_linkedList * a_list) {
	void * a_data = NULL;
	
	if ( a_list!= NULL && a_list->m_head != NULL ) {
		t_linkedListElement * l_element = a_list->m_head;
		
		a_data = l_element->m_data;
		l_element->m_data = NULL;
		a_list->m_head = l_element->m_next;
		
		free(l_element);
		
		if ( a_list->m_tail == l_element ) {
			a_list->m_tail = NULL;
		}
		
	} else {
		LOG_WARNING("Can't pop any element since list is not defined or empty.");
	}
	
	return a_data;
}

/**
 * 
 **/
void linkedListInsert(t_linkedList * a_list, t_linkedListElement * a_previousElement, void * a_data) {
	if ( a_previousElement->m_next == NULL ) {
		// previous element is the last element of the list, the Push the data
		linkedListPush(a_list, a_data);
	} else if( a_previousElement == NULL ) {
		// No previous element exists, insert data at the begining of the list
		linkedListPrepend(a_list, a_data);
	} else if( a_previousElement != NULL ) {
		t_linkedListElement * l_newListElement = linkedListElementCreate(a_data);
		if ( l_newListElement != NULL ) {
			a_previousElement->m_next = l_newListElement;
			l_newListElement->m_prev = a_previousElement;
			
			if( a_previousElement == a_list->m_tail ) {
				a_list->m_tail = l_newListElement;
			}
		} else {
			LOG_ERROR("Fail allocating new list element.");
		}
	}
}

/**
 *
 **/
 t_linkedList * linkedListCreate() {
 	t_linkedList * l_newList = (t_linkedList *)malloc(sizeof(t_linkedList));
	if ( l_newList == NULL ) {
		LOG_ERROR("Failed creating new linked list.");
	} else {
		l_newList->m_head = NULL;
		l_newList->m_tail = NULL;
	}
}
