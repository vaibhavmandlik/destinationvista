import React from "react";

interface PageHeaderProps {
  title: string;
  breadcrumb: { name: string; href?: string }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb }) => {
  return (
    <div className="container-fluid page-header">
      <div
        className="container"
        style={{ marginTop: "auto", minHeight: "400px", paddingTop: "100px" }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h3 className="display-4 text-white text-uppercase mt-5">{title}</h3>
          <div
            className="d-inline-flex text-white"
            style={{ marginTop: "10px" }}
          >
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <p className="m-0 text-uppercase">
                  {item.href ? (
                    <a className="text-white" href={item.href}>
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </p>
                {index < breadcrumb.length - 1 && (
                  <i className="fa fa-angle-double-right pt-1 px-3"></i>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
