/** @format */

import React from 'react'
import { compose, withStateHandlers, withHandlers, withProps } from 'recompose'
import { Query } from 'react-apollo'
import Table from 'react-table'
import checkboxHOC from 'react-table/lib/hoc/selectTable'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Icon from '@material-ui/core/Icon'

const CheckboxTable = checkboxHOC(Table)

const SelectInputComponent = ({ id, checked, onClick, row }) => (
  <Checkbox checked={checked} onChange={event => onClick(id, event.shiftKey, row)} color="primary" />
)

const DataTable = ({
  classes,
  query,
  variables,
  pageSize,
  page,
  sorted,
  filtered,
  getVariables,
  setPage,
  setPageSize,
  setSorted,
  setFiltered,
  selection,
  selectAll,
  isSelected,
  toggleSelection,
  toggleAll,
  onDeleteAll = () => null,
  actions = [],
  remote = true,
  deleteMany = true,
  ...rest
}) => (
  <Query query={query} variables={variables} fetchPolicy="cache-and-network">
    {({ loading, data, refetch }) => {
      const [key] = Object.keys(data)
      const { data: rows, pages } = data[key] || {}
      let controlledProps = {}
      if (remote) {
        controlledProps = {
          manual: true,
          pages: pages || -1,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
          onSortedChange: setSorted,
          onFilteredChange: setFiltered,
          page,
          pageSize,
          sorted,
          filtered
        }
      }

      return (
        <CheckboxTable
          /* General */
          //className="-striped -highlight"
          data={Array.from(rows || [])}
          loading={loading}
          showPaginationBottom
          pageSizeOptions={[5, 10, 20, 25, 50, 100, 250, 500, 1000]}
          sortable
          resizable
          filterable
          /* Selection */
          keyField="id"
          selectType="checkbox"
          selectAll={selectAll}
          isSelected={isSelected}
          toggleSelection={toggleSelection}
          toggleAll={() => toggleAll(rows)}
          SelectInputComponent={SelectInputComponent}
          SelectAllInputComponent={SelectInputComponent}
          selectWidth={65}
          /* Controlled State Overrides */
          {...controlledProps}
          //manual
          //pages={pages || -1}
          //onPageChange={setPage}
          //onPageSizeChange={setPageSize}
          //onSortedChange={setSorted}
          //onFilteredChange={setFiltered}
          //page={page}
          //pageSize={pageSize}
          //sorted={sorted}
          //filtered={filtered}
          /* Component Overrides */
          //TableComponent={TableMain}
          //TheadComponent={TableHead}
          //ThComponent={TableRow}
          //TbodyComponent={TableBody}
          //TrComponent={TableRow}
          //TdComponent={TableCell}
          /* Passed props */
          {...rest}
        >
          {(state, makeTable) => (
            <div>
              <div className={classes.btnToolbar}>
                <div className={classes.btnToolbar}>
                  {/*<Button className={classes.button} variant="contained" color="primary">
                    <Icon className={classes.leftIcon}>import_contacts</Icon>
                    Export to CSV
                  </Button>*/}
                  {deleteMany && (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      disabled={selection.length === 0}
                      onClick={() => onDeleteAll(selection)}
                    >
                      <Icon className={classes.leftIcon}>delete</Icon>
                      Delete All Selected
                    </Button>
                  )}
                </div>
                <div className={classes.btnToolbar}>{actions}</div>
              </div>
              <div className="ReactTable-Wrapper">{makeTable()}</div>
            </div>
          )}
        </CheckboxTable>
      )
    }}
  </Query>
)

const styles = theme => ({
  root: {},
  btnToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5px 0'
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const enhance = compose(
  withStateHandlers(
    ({ initialVariables }) => ({
      pageSize: 10,
      page: 0,
      sorted: [{ id: 'createdAt', desc: true }],
      filtered: [],
      selectAll: false,
      selection: [],
      ...initialVariables
    }),
    {
      setPage: () => page => ({ page }),
      setPageSize: () => pageSize => ({ pageSize }),
      setSorted: () => sorted => ({ sorted }),
      setFiltered: () => filtered => ({ filtered }),
      toggleAll: (state, { onSelect }) => data => {
        const selectAll = !state.selectAll
        const selection = selectAll ? data.map(item => item.id) : []
        if (onSelect) {
          onSelect(selection)
        }
        return { selectAll, selection }
      },
      toggleSelection: (state, { onSelect }) => key => {
        // Fix react table bug
        // https://github.com/tannerlinsley/react-table/issues/1243#issuecomment-459835765
        key = String(key).replace('select-', '')
        let selection = [...state.selection]
        const keyIndex = selection.indexOf(key)
        if (keyIndex >= 0) {
          selection = [...selection.slice(0, keyIndex), ...selection.slice(keyIndex + 1)]
        } else {
          selection.push(key)
        }
        if (onSelect) {
          onSelect(selection)
        }
        return { selection }
      }
    }
  ),
  withProps(({ page, pageSize, sorted, filtered, variables: variables = {} }) => ({
    variables: {
      limit: pageSize,
      skip: page * pageSize,
      sort: Array.from(sorted || []).map(sort => [sort.id, sort.desc ? '-1' : '1'])[0],
      ...Array.from(filtered || []).reduce((o, { id, value }) => ({ ...o, [id]: value }), {}),
      ...variables
    }
  })),
  withHandlers({
    isSelected: ({ selection }) => key => selection.includes(key)
  }),
  withStyles(styles)
)

export default enhance(DataTable)
