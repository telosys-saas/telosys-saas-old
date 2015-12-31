package org.telosys.saas.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.telosys.tools.generic.model.ModelType;

public class Model implements Serializable {

	private List<Entity> entities;
	private Map<String, Entity> entityByTableNames;
	private Map<String, Entity> entityByClassNames;
	private String databaseProductName;
	private String description;
	private String version;
	private Integer databaseId;
	private String name;
	private ModelType type;
	private String modelName;

	
	public String getName() {
		return name;
	}

	
	public ModelType getType() {
		return type;
	}

	
	public String getVersion() {
		return version;
	}

	
	public String getDescription() {
		return description;
	}

	
	public Integer getDatabaseId() {
		return databaseId;
	}

	
	public String getDatabaseProductName() {
		return databaseProductName;
	}

	
	public Entity getEntityByClassName(String entityClassName) {
		return entityByClassNames.get(entityClassName);
	}

	
	public Entity getEntityByTableName(String entityTableName) {
		return entityByTableNames.get(entityTableName);
	}

	public List<Entity> getEntities() {
		return entities;
	}

	public Map<String, Entity> getEntityByTableNames() {
		return entityByTableNames;
	}

	public void setEntityByTableNames(Map<String, Entity> entityByTableNames) {
		this.entityByTableNames = entityByTableNames;
	}

	public Map<String, Entity> getEntityByClassNames() {
		return entityByClassNames;
	}

	public void setEntityByClassNames(Map<String, Entity> entityByClassNames) {
		this.entityByClassNames = entityByClassNames;
	}

	public void setEntities(List<Entity> entities) {
		this.entities = entities;
	}

	public void setDatabaseProductName(String databaseProductName) {
		this.databaseProductName = databaseProductName;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public void setDatabaseId(Integer databaseId) {
		this.databaseId = databaseId;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setType(ModelType type) {
		this.type = type;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

}
