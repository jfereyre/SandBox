#ifndef __LINKED_LIST_H__
#define __LINKED_LIST_H__

typedef struct s_linkedListElement {
	struct s_linkedListElement * m_next;
	struct s_linkedListElement * m_prev;
	void * m_data;
} t_linkedListElement;

typedef struct s_linkedList {
	struct s_linkedListElement * m_head;
	struct s_linkedListElement * m_tail;
 } t_linkedList;

t_linkedList * linkedListCreate();
void linkedListPush(t_linkedList * a_list, void * a_data);
void * linkedListPop(t_linkedList * a_list);
void linkedListInsert(t_linkedList * a_list, t_linkedListElement * a_previousElement, void * a_data);

#endif /* __LINKED_LIST_H__ */
