/** @format */

import React from 'react'
import { compose, withStateHandlers, withProps } from 'recompose'
import { Query } from 'react-apollo'
import Table from 'react-table'

import 'react-table/react-table.css'
import 'assets/css/react-table-material.css'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

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
  remote = true,
  ...rest
}) => (
  <Query query={query} variables={variables} fetchPolicy="cache-and-network">
    {({ loading, data }) => {
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
        <Table
          /* General */
          className="-striped -highlight"
          data={Array.from(rows || [])}
          loading={loading}
          showPaginationBottom
          sortable
          resizable
          filterable
          keyField="id"
          /* Controlled State Overrides */
          {...controlledProps}
          //onPageChange={setPage}
          //onPageSizeChange={setPageSize}
          //onSortedChange={setSorted}
          //onFilteredChange={setFiltered}
          //page={page}
          //pageSize={pageSize}
          //sorted={sorted}
          //filtered={filtered}
          /* Passed props */
          {...rest}
        >
          {(state, makeTable) => (
            <div>
              <div className={classes.btnToolbar}>
                {/*<Button variant="contained" color="primary">
                  Export to CSV
                </Button>*/}
              </div>
              <div>{makeTable()}</div>
            </div>
          )}
        </Table>
      )
    }}
  </Query>
)

const styles = theme => ({
  root: {},
  btnToolbar: {
    margin: '5px 0'
  }
})

const enhance = compose(
  withStateHandlers(
    ({ initialVariables }) => ({
      pageSize: 10,
      page: 0,
      sorted: [{ id: 'createdAt', desc: true }],
      filtered: [],
      ...initialVariables
    }),
    {
      setPage: () => page => ({ page }),
      setPageSize: () => pageSize => ({ pageSize }),
      setSorted: () => sorted => ({ sorted }),
      setFiltered: () => filtered => ({ filtered })
    }
  ),
  withProps(({ page, pageSize, sorted, filtered, variables: variables = {} }) => ({
    variables: {
      ...variables,
      limit: pageSize,
      skip: page * pageSize,
      sort: Array.from(sorted || []).map(sort => [sort.id, sort.desc ? '-1' : '1'])[0],
      ...Array.from(filtered || []).reduce((o, { id, value }) => ({ ...o, [id]: value }), {})
    }
  })),
  withStyles(styles)
)

export default enhance(DataTable)
